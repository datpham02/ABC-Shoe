import React, { useEffect, useState } from 'react'
import {
    convertVNDToUSD,
    formatVietnameseDong,
    totalMoneyCart,
} from '~/utils/func'
import { useMutation, useQuery } from '@tanstack/react-query'

import AddressSettingPopupComponent from '~/Components/CheckOut/AddressSettingPopupComponent'
import { ImLocation } from 'react-icons/im'
import { LoadingComponent } from '~/Components'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

type CartItem = {
    product: {
        id: string
        name: string
        image: string
        size: string
        price: number
    }
    quantity: number
}
type DataPayPal = {
    orderID: string
    payerID: string
    paymentID: string
    billingToken: any
    facilitatorAccessToken: string
    paymentSource: string
}
type DetailsPayPal = {
    id: string
    intent: string
    status: string
    purchase_units: PurchaseUnit[]
    payer: Payer
    create_time: string
    update_time: string
    links: Link[]
}

type PurchaseUnit = {
    reference_id: string
    amount: Amount
    payee: Payee
    shipping: Shipping
    payments: Payments
}

type Amount = {
    currency_code: string
    value: string
}

type Payee = {
    email_address: string
    merchant_id: string
}

type Shipping = {
    name: Name
    address: Address
}

type Name = {
    full_name: string
}

type Address = {
    address_line_1: string
    admin_area_2: string
    admin_area_1: string
    postal_code: string
    country_code: string
}

type Payments = {
    captures: Capture[]
}

type Capture = {
    id: string
    status: string
    amount: Amount
    final_capture: boolean
    seller_protection: SellerProtection
    create_time: string
    update_time: string
}

type SellerProtection = {
    status: string
    dispute_categories: string[]
}

type Payer = {
    name: Name
    email_address: string
    payer_id: string
    address: Address
}

type Link = {
    href: string
    rel: string
    method: string
}

const CheckOut = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [addressSettingShow, setAddressSettingShow] = useState<Boolean>(false)

    const { data: cart } = useQuery({
        queryKey: ['get_cart'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/cart/get`)

            return data.cart
        },
    })
    const { data: address } = useQuery({
        queryKey: ['get_address'],
        queryFn: async () => {
            const { data } = await axios.get('/api/get/address')
            return data.address
        },
    })

    const { data: create_order } = useMutation({
        mutationKey: ['create_order'],
        mutationFn: async (dataOrder: {
            status: string
            orderItem: { productId: string; quantity: number }
            total: number
            addressId: string
        }) => {
            const { data } = await axios.post('/api/create/order', {
                ...dataOrder,
            })

            return data
        },
    })
    const handleAddressSettingShow = () => {
        if (addressSettingShow) {
            if (document) {
                document.body.style.overflowY = 'auto'
            }
            setAddressSettingShow(false)
        } else {
            if (document) {
                document.body.style.overflowY = 'hidden'
            }
            setAddressSettingShow(true)
        }
    }

    useEffect(() => {
        if (cart) {
            setIsLoading(false)
        }
    }, [cart])
    return (
        <>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <div
                    style={{ overflowY: 'auto' }}
                    className='w-full relative flex flex-col bg-[#F5F5F5]'
                >
                    <div className='px-[150px] mt-[20px] flex flex-col space-y-2'>
                        <div className='flex flex-col bg-[#fff] shadow-sm border-solod border-[1px] p-[20px]'>
                            <div className='flex items-center gap-2'>
                                <ImLocation className='text-[#ee4d2d] w-[20px] h-[20px]' />
                                <span className='text-[#ee4d2d] text-[20px]'>
                                    Địa Chỉ Nhận Hàng
                                </span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center gap-2'>
                                    <span className='font-bold text-[18px]'>
                                        {
                                            address?.filter(
                                                (address: any) =>
                                                    address.isDefault == true,
                                            )[0].name
                                        }
                                    </span>
                                    <span className='flex items-center gap-2 font-bold text-[18px] '>
                                        (+84)
                                        <span className='font-bold text-[18px]'>
                                            {
                                                address?.filter(
                                                    (address: any) =>
                                                        address.isDefault ==
                                                        true,
                                                )[0].phone
                                            }
                                        </span>
                                    </span>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <span className='line-clamp-2 text-[18px]'>
                                        {
                                            address?.filter(
                                                (address: any) =>
                                                    address.isDefault == true,
                                            )[0].location
                                        }
                                    </span>
                                    <span
                                        onClick={() => {
                                            handleAddressSettingShow()
                                        }}
                                        className='text-[#4080ee] cursor-pointer'
                                    >
                                        Thay Đổi
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className='flex bg-[#fff] py-[15px] shadow-sm shadow-[rgba(0,0,0,.05)]'>
                                <div className='w-[50%] rounded-sm flex justify-start items-center pl-[25px] text-[rgba(0,0,0,.54)]'>
                                    Sản Phẩm
                                </div>
                                <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                    Đơn Giá
                                </div>
                                <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                    Số Lượng
                                </div>
                                <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                    Số Tiền
                                </div>
                            </div>
                            <div className='bg-[#fff] shadow-sm shadow-[rgba(0,0,0,.05)]'>
                                {cart?.cartItem?.map((cartItem: CartItem) => (
                                    <div
                                        key={cartItem.product.id}
                                        className='flex bg-[#fff] py-[20px]'
                                    >
                                        <div className='w-[50%] rounded-sm flex justify-start items-center pl-[25px] gap-3'>
                                            <img
                                                className='w-[80px] object-cover'
                                                src={cartItem.product.image[0]}
                                            />
                                            <div className='flex items-center gap-3'>
                                                <span className='line-clamp-2 w-[50%]'>
                                                    {cartItem.product.name}
                                                </span>
                                                <div className='w-[50%] flex flex-col gap-1 justify-center items-center'>
                                                    <div className='w-full flex items-center justify-start text-[rgba(0,0,0,.54)]'>
                                                        <div className='relative flex items-center gap-2'>
                                                            <span className='cursor-pointer text-[rgba(0,0,0,.54)]'>
                                                                Phân Loại Hàng
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className='w-full flex items-center space-x-2 '>
                                                        <span className='text-[rgba(0,0,0,.54)]'>
                                                            Size:
                                                        </span>
                                                        <span className='text-[rgba(0,0,0,.54)]'>
                                                            {
                                                                cartItem.product
                                                                    .size
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                            <div className='flex items-center'>
                                                <div className='flex gap-2 items-center rounded-md px-[10px] py-[5px]'>
                                                    <span>
                                                        {formatVietnameseDong(
                                                            cartItem.product
                                                                .price,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                            1
                                        </div>
                                        <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                            <span>
                                                {formatVietnameseDong(
                                                    cartItem.product.price *
                                                        cartItem.quantity,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='bg-[#fff] sticky flex flex-col items-end gap-4 py-[25px] px-[20px] shadow-sm shadow-[rgba(0,0,0,.05)]'>
                                <div className='w-full flex justify-start items-center gap-3'>
                                    <span className='flex font-medium text-[20px]'>
                                        Phương thức thanh toán
                                    </span>
                                    <span className='flex items-center justify-center px-[15px] py-[4px] rounded-sm '>
                                        Thanh toán khi nhân hàng
                                    </span>
                                </div>
                                <hr className='my-[15px] w-full' />
                                <div className='flex flex-col items-end'>
                                    <div className='flex justify-between w-full gap-5 text-[rgba(0,0,0,.54)]'>
                                        <span>Tổng tiền hàng</span>
                                        <span>
                                            {formatVietnameseDong(
                                                totalMoneyCart(cart?.cartItem),
                                            )}
                                        </span>
                                    </div>
                                    <div className='flex justify-between w-full gap-5 text-[rgba(0,0,0,.54)]'>
                                        <span>Phí vận chuuyển</span>
                                        <span>
                                            {formatVietnameseDong(20000)}
                                        </span>
                                    </div>
                                    <div className='flex justify-between w-full gap-5'>
                                        <span className='flex items-center gap-1 text-[rgba(0,0,0,.54)]'>
                                            Tổng thanh toán
                                            <span className='text-[rgba(0,0,0,.54)]'>
                                                (1 Sản Phẩm):
                                            </span>
                                        </span>
                                        <span className='text-[24px] text-[#ee4d2d] leading-[28px]'>
                                            <span>
                                                {formatVietnameseDong(
                                                    totalMoneyCart(
                                                        cart?.cartItem,
                                                    ) + 20000,
                                                )}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <hr className='my-[15px] w-full border-dashed' />
                                <div className='flex flex-col'>
                                    <PayPalButton
                                        amount={convertVNDToUSD(
                                            totalMoneyCart(cart?.cartItem) +
                                                20000,
                                            23000,
                                        )}
                                        onSuccess={async (
                                            details: DetailsPayPal,
                                            data: DataPayPal,
                                        ) => {
                                            toast.promise(
                                                axios.post(
                                                    '/api/create/order',
                                                    {
                                                        status: 'Đã thanh toán',
                                                        orderItem:
                                                            cart?.cartItem.map(
                                                                (
                                                                    cartItem: CartItem,
                                                                ) => {
                                                                    return {
                                                                        productId:
                                                                            cartItem
                                                                                .product
                                                                                .id,
                                                                        quantity:
                                                                            cartItem.quantity,
                                                                    }
                                                                },
                                                            ),
                                                        total:
                                                            totalMoneyCart(
                                                                cart?.cartItem,
                                                            ) + 20000,
                                                        addressId:
                                                            address?.filter(
                                                                (
                                                                    address: any,
                                                                ) =>
                                                                    address.isDefault ==
                                                                    true,
                                                            )[0].id,
                                                    },
                                                ),
                                                {
                                                    error: 'Thanh toán thất bại',
                                                    success:
                                                        'Thanh toán thành công',
                                                    loading: 'Đang thanh toán',
                                                },
                                            )
                                            router.push('/')
                                        }}
                                        onApprove={(
                                            data: any,
                                            actions: any,
                                        ) => {
                                            return actions.order.get()
                                        }}
                                        options={{
                                            clientId:
                                                process.env
                                                    .NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {addressSettingShow ? (
                        <div className='fixed z-[3] inset-0 bg-[rgba(0,0,0,.4)] flex justify-center'>
                            <AddressSettingPopupComponent
                                className='w-[600px] mt-[150px]'
                                handlShowAddressSetting={
                                    handleAddressSettingShow
                                }
                            />
                        </div>
                    ) : null}
                </div>
            )}
        </>
    )
}

export default CheckOut

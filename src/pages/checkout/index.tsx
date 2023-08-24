import {
    AddAddressFormComponent,
    LoadingComponent,
    MetaComponent,
} from '~/Components'
import React, { useEffect, useRef, useState } from 'react'
import {
    convertVNDToUSD,
    formatVietnameseDong,
    totalMoneyCart,
} from '~/utils/func'
import { useMutation, useQuery } from '@tanstack/react-query'
import AddressSettingPopupComponent from '~/Components/CheckOut/AddressSettingPopupComponent'
import { AiOutlinePlus } from 'react-icons/ai'
import { ImLocation } from 'react-icons/im'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { Button } from '@material-tailwind/react'
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
    const paypalBtnRef = useRef<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [addAddressFormShow, setAddAddressFormShow] = useState<boolean>(false)
    const [addressSettingShow, setAddressSettingShow] = useState<Boolean>(false)
    const [addressSelect, setAddressSelect] = useState<{
        id: string
        name: string
        phone: string
        location: string
        address: string
        isDefault: boolean
        userId: string
    } | null>()
    const [currentPageURL, setCurrentPageURL] = useState('')

    useEffect(() => {
        setCurrentPageURL(window.location.href)
    }, [])
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

    const {
        data: create_order_data,
        mutate: create_order,
        isLoading: isOrder,
    } = useMutation({
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
        onSuccess: (data) => {
            if (data.success) {
                toast.dismiss()
                toast.success('Đặt đơn hàng thành công !')
                router.push('/')
            } else {
                toast.dismiss()
                toast.error('Đặt đơn hàng thất bại !')
            }
        },
        onError: () => {
            toast.error('Có lỗi xảy ra, xin hãy f5 lại để tiếp tục !')
        },
    })
    const { mutate: vnpay } = useMutation({
        mutationKey: ['vnpay'],
        mutationFn: async (dataVnpay: {
            amount: number
            orderInfoJson: string
        }) => {
            const { data } = await axios.post('/api/create/payment/checkout', {
                ...dataVnpay,
            })

            return data
        },
        onSuccess: (data) => {
            console.log(data)
            toast.dismiss()
            if (data.success) {
                window.location.replace(data.redirect)
            }
        },
        onError: () => {
            toast.dismiss()
            toast.error('Có lỗi xảy ra, xin hãy f5 lại để tiếp tục !')
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
    const handleVnpay = () => {
        toast.loading('Đang tiến hành đặt đơn . . .')
        vnpay({
            amount: totalMoneyCart(cart?.cartItem) + 20000,
            orderInfoJson: JSON.stringify({
                status: 'Thanh toán thành công',
                orderItem: cart?.cartItem.map((cartItem: CartItem) => {
                    return {
                        productId: cartItem.product.id,
                        quantity: cartItem.quantity,
                    }
                }),
                total: totalMoneyCart(cart?.cartItem) + 20000,
                addressId: addressSelect?.id as string,
            }),
        })
    }
    const handleCODMethod = () => {
        toast.loading('Đang tiến hành đặt đơn . . .')
        create_order({
            status: 'Chưa thanh toán',
            orderItem: cart?.cartItem.map((cartItem: CartItem) => {
                return {
                    productId: cartItem.product.id,
                    quantity: cartItem.quantity,
                }
            }),
            total: totalMoneyCart(cart?.cartItem) + 20000,
            addressId: addressSelect?.id as string,
        })
    }

    useEffect(() => {
        if (cart) {
            setIsLoading(false)
        }
    }, [cart])
    useEffect(() => {
        if (address) {
            setAddressSelect(
                address?.filter(
                    (address: {
                        id: string
                        name: string
                        phone: string
                        location: string
                        address: string
                        isDefault: boolean
                        userId: string
                    }) => address.isDefault == true,
                )[0],
            )
        }
    }, [address])

    return (
        <>
            <MetaComponent
                title={
                    'Xác Nhận Đơn Hàng tại ABCShoe: Bước Quan Trọng Kết Thúc Hành Trình Mua Sắm'
                }
                description={
                    'Trang Checkout ABCShoe: Nơi Hoàn Tất Hành Trình Mua Sắm Cùng Đôi Giày Mơ Ước'
                }
                image={'./abc.png'}
                url={currentPageURL}
            />
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <div
                    style={{ overflowY: 'auto' }}
                    className='w-full relative flex flex-col bg-[#F5F5F5]'
                >
                    <div className='2xl:px-[160px] xl:px-[140px] lg:px-[100px] md:px-[50px] px-[20px] mt-[20px] flex flex-col space-y-2'>
                        <div className='flex flex-col space-y-2 bg-[#fff] shadow-sm border-solod border-[1px] p-[20px]'>
                            <div className='flex justify-between items-center space-x-2'>
                                <div className='flex items-center gap-2'>
                                    <ImLocation className='text-[#ee4d2d] w-[20px] h-[20px]' />
                                    <span className='text-[#ee4d2d] text-[20px]'>
                                        Địa Chỉ Nhận Hàng
                                    </span>
                                </div>
                                <div
                                    onClick={() => {
                                        setAddAddressFormShow(true)
                                    }}
                                    className='cursor-pointer flex items-center gap-2 bg-[#ee4d2d] px-[12px] py-[6px]'
                                >
                                    <AiOutlinePlus className='text-[#fff] w-[14px] h-[14px]' />
                                    <span className='text-[#fff] text-[14px] '>
                                        Thêm địa Chỉ Nhận Hàng
                                    </span>
                                </div>
                            </div>
                            <div className='flex items-center gap-4'>
                                {addressSelect ? (
                                    <>
                                        <div className='flex items-center gap-2'>
                                            <span className='font-bold text-[18px] line-clamp-1'>
                                                {addressSelect?.name}
                                            </span>
                                            <span className='flex items-center gap-2 font-bold text-[18px] line-clamp-1'>
                                                (+84)
                                                <span className='font-bold text-[18px]'>
                                                    {addressSelect?.phone}
                                                </span>
                                            </span>
                                        </div>
                                        <div className='flex justify-between items-center space-x-2'>
                                            <span className='text-[18px] line-clamp-1'>
                                                {addressSelect?.location}
                                            </span>
                                            <span
                                                onClick={() => {
                                                    handleAddressSettingShow()
                                                }}
                                                className='text-[#4080ee] cursor-pointer whitespace-nowrap'
                                            >
                                                Thay Đổi
                                            </span>
                                        </div>
                                    </>
                                ) : (
                                    <div className='w-full h-full'>
                                        Chưa có địa chỉ nhận hàng
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className='flex bg-[#fff] py-[15px] shadow-sm shadow-[rgba(0,0,0,.05)]'>
                                <div className='lg:w-[50%] w-[30%] rounded-sm flex justify-start items-center pl-[25px]'>
                                    Sản Phẩm
                                </div>
                                <div className='lg:w-[12.5%] w-[17.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                    Đơn Giá
                                </div>
                                <div className='lg:w-[12.5%] w-[17.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                    Số Lượng
                                </div>
                                <div className='lg:w-[12.5%] w-[17.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                    Số Tiền
                                </div>
                            </div>
                            <div className='bg-[#fff] shadow-sm shadow-[rgba(0,0,0,.05)]'>
                                {cart?.cartItem?.map((cartItem: CartItem) => (
                                    <div
                                        key={cartItem.product.id}
                                        className='flex bg-[#fff] py-[20px]'
                                    >
                                        <div className='lg:w-[50%] w-[30%] rounded-sm flex justify-start items-center pl-[25px] gap-3'>
                                            <img
                                                className='w-[80px] object-cover'
                                                src={cartItem.product.image[0]}
                                            />
                                            <div className='lg:flex hidden items-center gap-3'>
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
                                        <div className='lg:w-[12.5%] w-[17.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
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
                                        <div className='lg:w-[12.5%] w-[17.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                            {cartItem.quantity}
                                        </div>
                                        <div className='lg:w-[12.5%] w-[17.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
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
                                <div className='w-full flex justify-start items-center'>
                                    <span className='flex font-medium text-[20px]'>
                                        Phương thức thanh toán
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
                                                {`(${cart?.cartItem?.quantity} Sản Phẩm):`}
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
                                {addressSelect ? (
                                    <div className='flex items-center space-x-2'>
                                        <Button
                                            variant='gradient'
                                            color='light-blue'
                                            onClick={() => {
                                                handleCODMethod()
                                            }}
                                            disabled={isOrder}
                                            className='flex items-center justify-center w-[150px] h-[50px] shadow-none text-[18px] hover:shadow-none hover:sepia-[brightness(0.95)]'
                                        >
                                            COD
                                        </Button>
                                        <Button
                                            variant='gradient'
                                            color='light-blue'
                                            onClick={() => {
                                                handleVnpay()
                                            }}
                                            disabled={isOrder}
                                            className='flex items-center w-[150px] h-[50px] shadow-none hover:shadow-none hover:sepia-[brightness(0.95)]'
                                        >
                                            <img
                                                src='/logo-vnpay.png'
                                                alt='vnpay'
                                                className='w-full h-full object-contain'
                                            />
                                        </Button>

                                        <PayPalButton
                                            ref={paypalBtnRef}
                                            amount={convertVNDToUSD(
                                                totalMoneyCart(cart?.cartItem) +
                                                    20000,
                                                23000,
                                            )}
                                            style={{
                                                color: 'gold',
                                                shape: 'rect',
                                                label: 'pay',
                                                layout: 'horizontal',
                                                tagline: 'false',
                                                height: 50,
                                            }}
                                            onSuccess={(
                                                details: DetailsPayPal,
                                                data: DataPayPal,
                                            ) => {
                                                if (
                                                    details.status ==
                                                    'COMPLETED'
                                                ) {
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
                                                                    addressSelect.id,
                                                            },
                                                        ),
                                                        {
                                                            error: 'Đặt đơn hàng thất bại !',
                                                            success:
                                                                'Đặt đơn hàng thành công !',
                                                            loading:
                                                                'Đang tiến hành đặt đơn . . .',
                                                        },
                                                    )
                                                } else
                                                    toast.error(
                                                        'Đặt đơn hàng thất bại !',
                                                    )
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
                                ) : null}
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

                    {addAddressFormShow ? (
                        <div className='fixed z-[3] inset-0 bg-[rgba(0,0,0,.4)] flex justify-center'>
                            <AddAddressFormComponent
                                className='w-[600px] mt-[150px]'
                                hiddenAddressForm={() => {
                                    setAddAddressFormShow(false)
                                }}
                            />
                        </div>
                    ) : null}
                </div>
            )}
        </>
    )
}

export default CheckOut

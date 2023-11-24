import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth/next'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import queryClient from '~/lib/use_query'
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { formatVietnameseDong, totalMoneyCart } from '~/utils/func'

import { useMutation, useQuery } from '@tanstack/react-query'
import { MetaComponent } from '~/Components'
type Cart = {
    id: string
    cartItem: CartItem[]
}
type CartItem = {
    id: string
    product: {
        id: string
        name: string
        image: string[]
        size: string
        price: number
    }
    quantity: number
}
const Cart = () => {
    const [currentPageURL, setCurrentPageURL] = useState('')

    useEffect(() => {
        setCurrentPageURL(window.location.href)
    }, [])
    const [cartData, setCartData] = useState<Cart>({ id: '', cartItem: [] })
    const { data: cart, isSuccess } = useQuery({
        queryKey: ['get_cart'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/cart/get`)

            return data.cart
        },
    })

    const { mutate, isSuccess: isSuccessDelete } = useMutation({
        mutationKey: ['delete_cartItem'],
        mutationFn: async (cartItemDelete: {
            cartId: string
            orderItemId: string
        }) => {
            const { data } = await axios.post('/api/cart/delete_item', {
                cartId: cartItemDelete.cartId,
                orderItemId: cartItemDelete.orderItemId,
            })
            return data
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success('Xóa sản phẩm thành công !')
                queryClient.setQueryData(['get_cart'], data.cart)
                setCartData(data.cart)
            }
        },
        onError: () => {
            toast.error('Có lỗi xảy ra, xin hãy f5 lại để tiếp tục !')
        },
    })
    useEffect(() => {
        if (isSuccess) {
            setCartData(cart)
        }
    }, [isSuccess])
    return (
        <div className='h-screen relative flex flex-col gap-4 bg-[#F5F5F5]'>
            <MetaComponent
                url={currentPageURL}
                image='./abc.png'
                title='Túi Giày Trên ABCShoe: Bước Đẹp Với Bộ Sưu Tập Giày Đa Dạng'
                description='Khám phá Túi Giày trên ABCShoe - Nơi bạn tìm thấy sự hoàn hảo về giày dép! Dựa vào bộ sưu tập đa dạng của chúng tôi, chúng tôi tự hào cung cấp những đôi giày tốt nhất cho mọi dịp, từ thời trang hàng ngày đến những bước đi quan trọng. Hãy khám phá ngay hôm nay và tạo nên phong cách riêng của bạn với ABCShoe.'
            />
            <div>
                <div className='w-full h-[25px] bg-[#000]'></div>
                <div className='bg-[#fff] flex items-center justify-between px-[160px] py-[30px]'>
                    <Link href='/'>
                        <div className='flex items-center gap-3 cursor-pointer'>
                            <span className='text-[30px] text-[#000]'>ABC</span>
                            <span className='border-l-solid border-l-[1px] border-l-[#827575] pl-[10px] text-[20px] text-[#827575] font-[370]'>
                                Giỏ Hàng
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='h-full flex flex-col gap-4 2xl:px-[160px] xl:px-[140px] lg:px-[100px] md:px-[50px] px-[20px] '>
                <div className='flex bg-[#fff] py-[15px] shadow-sm'>
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
                    <div className='lg:w-[12.5%] w-[17.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                        Thao Tác
                    </div>
                </div>
                <div className='h-full'>
                    {cartData?.cartItem?.map((cartItem: CartItem) => (
                        <div
                            key={cartItem.product.id}
                            className='flex bg-[#fff] py-[20px]'
                        >
                            <div className='lg:w-[50%] w-[30%] rounded-sm flex justify-start items-center pl-[25px] gap-3'>
                                <img
                                    className='w-[80px] object-cover'
                                    src={cartItem.product.image[0]}
                                />
                                <div className=' items-center gap-3 lg:flex hidden'>
                                    <span className='line-clamp-2 w-[50%]'>
                                        {cartItem.product.name}
                                    </span>
                                    <div className='w-[50%] flex flex-col gap-1 justify-center items-center'>
                                        <div className='w-full flex items-center justify-start text-[rgba(0,0,0,.54)]'>
                                            <div className='relative flex items-center gap-2'>
                                                <span>Phân Loại Hàng</span>
                                            </div>
                                        </div>
                                        <div className='w-full flex justify-start'>
                                            <span className='text-[rgba(0,0,0,.54)]'>
                                                Size:
                                            </span>
                                            <span className='text-[rgba(0,0,0,.54)]'>
                                                {cartItem.product.size}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='lg:w-[12.5%] w-[17.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                <div className='flex items-center'>
                                    <div className='flex gap-2 items-center rounded-md px-[10px] py-[5px]'>
                                        {/* <span className='line-through opacity-[0.26]'>
                                                    {formatVietnameseDong(
                                                        5000000,
                                                    )}
                                                </span> */}
                                        <span>
                                            {formatVietnameseDong(
                                                cartItem.product.price,
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='lg:w-[12.5%] w-[17.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                <div className='flex items-center h-[32px]'>
                                    <span className='w-[50px] h-full flex items-center justify-center'>
                                        {cartItem.quantity}
                                    </span>
                                </div>
                            </div>
                            <div className='lg:w-[12.5%] w-[17.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                <span>
                                    {formatVietnameseDong(
                                        cartItem.product.price *
                                            cartItem.quantity,
                                    )}
                                </span>
                            </div>
                            <div className='lg:w-[12.5%] w-[17.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                <span
                                    onClick={() => {
                                        mutate({
                                            cartId: cart?.id as string,
                                            orderItemId: cartItem.id,
                                        })
                                    }}
                                    className=' cursor-pointer'
                                >
                                    Xóa
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='sticky bottom-0 w-full'>
                    <div className='bottom-0 bg-[#fff] flex items-center justify-end gap-4 py-[25px] px-[20px] shadow-sm shadow-[rgba(0,0,0,.05)]'>
                        <div className='flex gap-1'>
                            <span className='flex items-center gap-1'>
                                {`Tổng thanh toán (
                                    ${
                                        cartData.cartItem.length > 0
                                            ? cartData?.cartItem?.reduce(
                                                  (
                                                      total_quantity: number,
                                                      orderItem: CartItem,
                                                  ) => {
                                                      return (
                                                          total_quantity +
                                                          orderItem.quantity
                                                      )
                                                  },
                                                  0,
                                              )
                                            : 0
                                    } Sản phẩm):`}
                            </span>
                            <span className='text-[24px] text-[#000] leading-[28px]'>
                                {formatVietnameseDong(
                                    totalMoneyCart(cart?.cartItem),
                                )}
                            </span>
                        </div>
                        <div className='flex items-center'>
                            {cartData.cartItem.length > 0 ? (
                                <Link href={'/checkout'}>
                                    <button className='bg-[#000] text-[#fff] rounded-sm md:px-[50px] md:py-[10px] px-[20px] py-[10px]'>
                                        Mua hàng
                                    </button>
                                </Link>
                            ) : (
                                <button className='bg-[#000] text-[#fff] rounded-sm md:px-[50px] md:py-[10px] px-[20px] py-[10px] cursor-not-allowed opacity-20'>
                                    Mua hàng
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions,
    )

    if (!session?.user) {
        return {
            redirect: {
                destination: '/login',
                permanent: true,
            },
        }
    }
    return {
        props: {},
    }
}

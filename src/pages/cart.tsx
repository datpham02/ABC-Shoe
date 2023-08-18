import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { formatVietnameseDong, totalMoneyCart } from '~/utils/func'
type CartItem = {
    product: {
        id: string
        name: string
        img: string
        classify: {
            size: string
            id: string
        }
        price: number
    }
    quantity: number
}
const Cart = () => {
    const { data: cart } = useQuery({
        queryKey: ['get_cart'],
        queryFn: async () => {
            const { data } = await axios.get(`/api/cart/get`)

            return data.cart
        },
    })

    return (
        <div className='flex flex-col gap-4 bg-[#F5F5F5]'>
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
            <div className='flex flex-col gap-4 px-[160px]'>
                <div className='flex bg-[#fff] py-[15px] shadow-sm'>
                    <div className='w-[50%] rounded-sm flex justify-start items-center pl-[25px]'>
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
                    <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                        Thao Tác
                    </div>
                </div>
                <div className='bg-[#fff] shadow-sm shadow-[rgba(0,0,0,.05)]'>
                    {cart?.map((cartItem: CartItem) => (
                        <>
                            <div className='flex bg-[#fff] py-[20px]'>
                                <div className='w-[50%] rounded-sm flex justify-start items-center pl-[25px] gap-3'>
                                    <img
                                        className='w-[80px] object-cover'
                                        src={cartItem.product.img}
                                    />
                                    <div className='flex items-center gap-3'>
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
                                                    {
                                                        cartItem.product
                                                            .classify.size
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                    <div className='flex items-center'>
                                        <div className='flex gap-2 items-center rounded-md px-[10px] py-[5px]'>
                                            {/* <span className='line-through opacity-[0.26]'>
                                                {formatVietnameseDong(5000000)}
                                            </span> */}
                                            <span>
                                                {formatVietnameseDong(
                                                    cartItem.product.price,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                    <div className='flex items-center h-[32px]'>
                                        <span className='w-[50px] h-full flex items-center justify-center'>
                                            {cartItem.quantity}
                                        </span>
                                    </div>
                                </div>
                                <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                    <span>
                                        {formatVietnameseDong(
                                            cartItem.product.price *
                                                cartItem.quantity,
                                        )}
                                    </span>
                                </div>
                                <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                    <button className=' cursor-pointer'>
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                <div className='bg-[#fff] sticky flex items-center justify-end gap-4 py-[25px] px-[20px] shadow-sm shadow-[rgba(0,0,0,.05)]'>
                    <div className='flex gap-1'>
                        <span className='flex items-center gap-1'>
                            {`Tổng thanh toán (${
                                cart?.lenght ? cart?.lenght : 0
                            } Sản phẩm):`}
                        </span>
                        <span className='text-[24px] text-[#000] leading-[28px]'>
                            {formatVietnameseDong(totalMoneyCart(cart))}
                        </span>
                    </div>
                    <div className='flex items-center'>
                        <Link href={'/checkout'}>
                            <button className='bg-[#000] text-[#fff] rounded-sm px-[50px] py-[10px]'>
                                Mua hàng
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart

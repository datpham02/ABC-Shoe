import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { formatVietnameseDong } from '~/utils/func'

const Cart = () => {
    const [cart, setCart] = useState<any[]>([])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('cart') as any)
        if (data) {
            setCart([...data])
        }
    }, [])

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
                    <div className='flex bg-[#fff] py-[20px]'>
                        <div className='w-[50%] rounded-sm flex justify-start items-center pl-[25px] gap-3'>
                            <img
                                className='w-[80px] object-cover'
                                src='https://product.hstatic.net/200000384421/product/8609_01.jpg_730e52ab95f04401a870e9ac2aa8aad8_670a497801244d37b6886ed10dccd43d_medium.jpeg'
                            />
                            <div className='flex items-center gap-3'>
                                <span className='line-clamp-2 w-[50%]'>
                                    Giày Adidas Superstar OG 'Vintage White'
                                    C77124
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
                                            33
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                            <div className='flex items-center'>
                                <div className='flex gap-2 items-center rounded-md px-[10px] py-[5px]'>
                                    <span className='line-through opacity-[0.26]'>
                                        {formatVietnameseDong(5000000)}
                                    </span>
                                    <span>{formatVietnameseDong(5000000)}</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                            <div className='flex items-center h-[32px]'>
                                <button className='w-[32px] h-[32px] flex items-center justify-center border-solid border-[1px] border-[rgba(0,0,0,.09)]'>
                                    <AiOutlineMinus />
                                </button>
                                <span className='focus:ring-transparent focus:border-[rgba(0,0,0,.09)] w-[50px] h-full border-solid border-[1px] border-[rgba(0,0,0,.09)] border-x-0 text-center'>
                                    99
                                </span>
                                <button className='w-[32px] h-[32px] flex items-center justify-center border-solid border-[1px] border-[rgba(0,0,0,.09)]'>
                                    <AiOutlinePlus />
                                </button>
                            </div>
                        </div>
                        <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                            <span>{formatVietnameseDong(5000000)}</span>
                        </div>
                        <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                            <button className=' cursor-pointer'>Xóa</button>
                        </div>
                    </div>
                </div>
                <div className='bg-[#fff] sticky flex items-center justify-end gap-4 py-[25px] px-[20px] shadow-sm shadow-[rgba(0,0,0,.05)]'>
                    <div className='flex gap-1'>
                        <span className='flex items-center gap-1'>
                            Tổng thanh toán (0 Sản phẩm):
                        </span>
                        <span className='text-[24px] text-[#000] leading-[28px]'>
                            {formatVietnameseDong(5000000)}
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

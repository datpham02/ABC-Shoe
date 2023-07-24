import React from 'react'
import { GrClose } from 'react-icons/gr'
import { CartItemComponent, PathComponent } from '~/Components'
import QuantityComponent from '~/Components/DetailPage/QuantityComponent'
import { formatVietnameseDong } from '~/utils/func'

const Cart = () => {
    const data = [
        {
            name: 'trang chủ',
            href: '/',
        },
        {
            name: 'giỏ hàng',
            href: 'cart',
        },
    ]
    return (
        <div className='flex flex-col space-y-10'>
            <PathComponent
                className='px-[150px] bg-[#F5F5F5]  py-[20px]'
                data={data}
            />
            <div className='flex flex-col px-[150px]'>
                <div className='flex flex-col items-center'>
                    <span className='font-medium text-[30px]'>
                        Giỏ hàng của bạn
                    </span>
                    <span className='text-[14px]'>
                        Có 2 sản phẩm trong giỏ hàng
                    </span>
                </div>
                {/* <table className='table-fixed'>
                    <thead>
                        <tr>
                            <th className='text-start'></th>
                            <th className='text-start'>Tên sản phẩm</th>
                            <th className='text-start'>Giá</th>
                            <th className='text-center'>Số lượng</th>
                            <th className='text-start'>Thành tiền</th>
                            <th className='text-start'></th>
                        </tr>
                    </thead>
                    <tbody>
                        <CartItemComponent />
                    </tbody>
                </table> */}
                <div className='flex flex-col space-y-4'>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-1'></div>
                        <div className='col-span-6 font-medium text-[18px]'>
                            Tên sản phẩm
                        </div>
                        <div className='col-span-1 font-medium text-[18px]'>
                            Giá
                        </div>
                        <div className='col-span-2 font-medium text-[18px]'>
                            Số lượng
                        </div>
                        <div className='col-span-1 font-medium text-[18px]'>
                            Thành tiền
                        </div>
                        <div className='col-span-1'></div>
                    </div>
                    <div className='grid grid-cols-12'>
                        <div className='col-span-1'>
                            <img src='https://product.hstatic.net/200000384421/product/air-jordan-1-low-white-black-dar_a0a9f1d4c551454392aadb9bb7738cf3_medium.png' />
                        </div>
                        <div className='col-span-6 font-medium text-[18px]'>
                            <div className='flex flex-col justify-center'>
                                <span className='font-semibold text-[blue]'>
                                    Giày Nike Air Jordan 1 Retro Low OG 'Powder
                                    Blue' CZ0790-104
                                </span>
                                <div className='flex items-center'>
                                    <span>Size: </span>
                                    <span>36</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-1 font-medium text-[18px]'>
                            <div className='text-start text-[#D5060A] font-semibold text-[18px]'>
                                {formatVietnameseDong(5000000)}
                            </div>
                        </div>
                        <div className='col-span-2 font-medium text-[18px]'>
                            <QuantityComponent />
                        </div>
                        <div className='col-span-1 font-medium text-[18px]'>
                            <div className='text-start text-[#D5060A] font-semibold text-[18px]'>
                                {formatVietnameseDong(5000000)}
                            </div>
                        </div>
                        <div className='col-span-1'>
                            <div className='flex items-center justify-center'>
                                <GrClose className='text-[20px] cursor-pointer' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart

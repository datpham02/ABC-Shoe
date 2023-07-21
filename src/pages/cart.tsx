import React from 'react'
import { CartItemComponent, PathComponent } from '~/Components'
import QuantityComponent from '~/Components/DetailPage/QuantityComponent'
import { formatVietnameseDong } from '~/utils/func'
import { GrClose } from 'react-icons/gr'
const Cart = () => {
    const data = ['trang chu', 'giay', 'giay a']
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
                <table className='table-fixed'>
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
                </table>
            </div>
        </div>
    )
}

export default Cart

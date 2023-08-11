import React from 'react'
import { BiSearch, BiSortAlt2 } from 'react-icons/bi'
import { HiOutlineViewColumns } from 'react-icons/hi2'
import StoreLayout from '~/layout/StoreLayout'
const Order = () => {
    return (
        <StoreLayout>
            <div className=' flex flex-col space-y-2 py-[15px] px-[30px]'>
                <span className='text-[20px] font-semibold'>Đơn hàng</span>
                <div className='flex flex-col'>
                    <div className='bg-[#fff] flex items-center space-x-2 py-[10px] px-[20px] border-b-[1px] rounded-sm'>
                        <span className='cursor-pointer px-[10px] py-[5px] font-medium border-b-[2px] border-b-[blue]'>
                            Tất cả
                        </span>
                        <span className='cursor-pointer px-[10px] py-[5px]'>
                            Đã thanh toán
                        </span>
                        <span className='cursor-pointer px-[10px] py-[5px]'>
                            Chưa thanh toán
                        </span>
                    </div>
                    <div className='relative flex flex-col space-y-4 sm:rounded-lg py-[20px]'>
                        <div className='flex items-center space-x-2'>
                            <div className='w-full relative flex flex-1 items-center'>
                                <input
                                    placeholder='Tìm kiếm theo tên khách hàng hoặc ID'
                                    className='w-full placeholder:text-[14px] outline-none border-solid border-[1px] rounded-md py-[8px] pl-[35px]'
                                />
                                <BiSearch className='absolute left-[8px] text-[20px]' />
                            </div>
                            <div className='flex items-center space-x-1'>
                                <div className='flex items-center space-x-2 px-[10px] py-[8px] border-solid border-[1px] rounded-md bg-[#fff]'>
                                    <HiOutlineViewColumns className='text-[20px]' />
                                    <span>Cột</span>
                                </div>
                                <div className='flex items-center space-x-2 px-[10px] py-[8px] border-solid border-[1px] rounded-md bg-[#fff]'>
                                    <BiSortAlt2 className='text-[20px]' />
                                    <span> Sắp xếp</span>
                                </div>
                            </div>
                        </div>
                        <table className='w-full text-sm text-left text-gray-500 '>
                            <thead className='text-xs text-gray-700 bg-[#fff]'>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        <div className='flex items-center space-x-4'>
                                            <input
                                                placeholder='checkbox'
                                                type='checkbox'
                                                className='focus:opacity-100 cursor-pointer w-[15px] h-[15px]'
                                            />
                                            <span>Đơn hàng</span>
                                        </div>
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        Ngày đặt
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        Khách hàng
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        Thành tiền
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-4 border-solid border-[1px]'
                                    >
                                        Tình trạng thanh toán
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 border-solid border-[1px]'
                                    >
                                        Số lượng sản phẩm
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 border-solid border-[1px]'
                                    >
                                        Phương thức vận chuyển
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='bg-white border-b '>
                                    <th
                                        scope='row'
                                        className='px-6 py-4 font-medium text-gray-900  whitespace-nowrap'
                                    >
                                        <div className='flex items-center space-x-4'>
                                            <input
                                                placeholder='checkbox'
                                                type='checkbox'
                                                className='focus:opacity-100 cursor-pointer w-[15px] h-[15px]'
                                            />
                                            <span>#1235</span>
                                        </div>
                                    </th>
                                    <td className='px-6 py-4'>
                                        Yesterday at 12:25 pm
                                    </td>
                                    <td className='px-6 py-4'>
                                        Pham Trong Dat
                                    </td>
                                    <td className='px-6 py-4'>5000000</td>
                                    <td className='px-6 py-4'>
                                        <div className='flex justify-start w-full'>
                                            <span className='bg-[#0be881] text-center text-white px-2.5 py-1 rounded'>
                                                Paid
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>10</td>
                                    <td className='px-6 py-4'>Hỏa tốc</td>
                                </tr>
                                <tr className='bg-white border-b '>
                                    <th
                                        scope='row'
                                        className='px-6 py-4 font-medium text-gray-900  whitespace-nowrap'
                                    >
                                        <div className='flex items-center space-x-4'>
                                            <input
                                                placeholder='checkbox'
                                                type='checkbox'
                                                className='focus:opacity-100 cursor-pointer w-[15px] h-[15px]'
                                            />
                                            <span>#1235</span>
                                        </div>
                                    </th>
                                    <td className='px-6 py-4'>
                                        Yesterday at 12:25 pm
                                    </td>
                                    <td className='px-6 py-4'>
                                        Pham Trong Dat
                                    </td>
                                    <td className='px-6 py-4'>5000000</td>
                                    <td className='px-6 py-4'>
                                        <div className='flex justify-start w-full'>
                                            <span className='bg-[#0be881] text-center text-white px-2.5 py-1 rounded'>
                                                Paid
                                            </span>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>10</td>
                                    <td className='px-6 py-4'>Hỏa tốc</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </StoreLayout>
    )
}

export default Order

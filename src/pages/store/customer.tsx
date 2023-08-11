import React from 'react'
import { BiSearch, BiSortAlt2 } from 'react-icons/bi'
import { HiOutlineViewColumns } from 'react-icons/hi2'
import StoreLayout from '~/layout/StoreLayout'

const Customer = () => {
    return (
        <StoreLayout>
            <div className=' flex flex-col space-y-2 py-[15px] px-[30px]'>
                <span className='text-[20px] font-semibold'>Khách hàng</span>
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
                                        <span>Khách hàng</span>
                                    </div>
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 border-solid border-[1px]'
                                >
                                    Tên khách hàng
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 border-solid border-[1px]'
                                >
                                    Hình ảnh
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 border-solid border-[1px]'
                                >
                                    Ngày tham gia
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 border-solid border-[1px]'
                                >
                                    Số lượng sản phẩm đã mua
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 border-solid border-[1px]'
                                >
                                    Số tiền tiêu thụ
                                </th>
                                <th
                                    scope='col'
                                    className='px-6 py-4 border-solid border-[1px]'
                                >
                                    Tình trạng
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
                                    <p>Phạm Trọng Đạt</p>
                                </td>
                                <td className='px-6 py-4'>
                                    <div className='w-[100px] h-[100px]'>
                                        <img
                                            className='object-cover'
                                            src='https://product.hstatic.net/200000384421/product/screenshot_2022.03.21_12.06.18.2_25c832580af54ffea9f5099f79990e3d.png'
                                        />
                                    </div>
                                </td>
                                <td className='px-6 py-4'>
                                    Yesterday 12:50 pm
                                </td>
                                <td className='px-6 py-4'>500000</td>
                                <td className='px-6 py-4'>10</td>
                                <td className='px-6 py-4'>Đang hoạt động</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </StoreLayout>
    )
}

export default Customer

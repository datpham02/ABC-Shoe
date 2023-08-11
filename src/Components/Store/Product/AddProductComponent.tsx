import React from 'react'
import EditorComponent from '~/Components/Editor/EditorComponent'
import ClassifyComponent from './ClassifyComponent'
import { useFormContext } from 'react-hook-form'

const AddProduct = () => {
    const { register } = useFormContext()
    return (
        <div className='flex flex-col px-[180px]'>
            <div className='w-full flex flex-col space-y-5 py-[15px]'>
                <span className='text-[20px] font-semibold'>Thêm sản phẩm</span>
                <div className='flex space-x-2'>
                    <div className='w-[70%] flex flex-col space-y-2'>
                        <div className='bg-[#fff] flex flex-col space-y-4 px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md'>
                            <div className='flex flex-col space-y-2'>
                                <span className='text-[14px] text-[#303030] font-semibold'>
                                    Tiêu đề {`(Tên sản phẩm)`}
                                </span>
                                <input className='outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]' />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <span className='text-[14px] text-[#303030] font-semibold'>
                                    Mô tả
                                </span>
                                <EditorComponent />
                            </div>
                        </div>
                        <div className='group bg-[#fff] flex flex-col space-y-2  px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md'>
                            <span className='text-[14px] text-[#303030] font-semibold'>
                                Video,hình ảnh
                            </span>
                            <input id='file' className='hidden' />
                            <label htmlFor='file'>
                                <div className='group-hover:bg-[#F7F7F7] w-full h-[150px] rounded-md border-dashed border-[1px] border-[#000] flex items-center justify-center'>
                                    <div className='flex flex-col items-center space-y-2'>
                                        <div>
                                            <button className='px-[12px] py-[6px] bg-[#fff] text-[#000] shadow-sm border-solid border-[1px]  rounded-md text-[14px] '>
                                                Thêm tệp
                                            </button>
                                        </div>
                                        <span className='text-[14px] text-[#616161]'>
                                            Chấp nhận hình ảnh, video
                                        </span>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className='bg-[#fff] flex flex-col space-y-4 px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md'>
                            <span className='text-[14px] text-[#303030] font-semibold'>
                                Định giá
                            </span>
                            <div className='flex items-center space-x-4'>
                                <div className='inline-flex flex-col space-y-2'>
                                    <span>Giá gốc</span>
                                    <div className='relative flex items-center'>
                                        <input
                                            placeholder='0'
                                            className='outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                                        />
                                        <span className='absolute right-[10px] text-[#898F94]'>{`₫`}</span>
                                    </div>
                                </div>
                                <div className='inline-flex flex-col space-y-2'>
                                    <span>Giá</span>
                                    <div className='relative flex items-center'>
                                        <input
                                            placeholder='0'
                                            className='outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                                        />
                                        <span className='absolute right-[10px] text-[#898F94]'>{`₫`}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center space-x-4'>
                                <div className='inline-flex flex-col space-y-2'>
                                    <span>Chi phí mỗi mặt hàng</span>
                                    <div className='relative flex items-center'>
                                        <input
                                            placeholder='0'
                                            className='outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                                        />
                                        <span className='absolute right-[10px] text-[#898F94]'>{`₫`}</span>
                                    </div>
                                </div>
                                <div className='inline-flex flex-col space-y-2'>
                                    <span>Lợi nhuận</span>
                                    <div className='relative flex items-center'>
                                        <input
                                            placeholder='--'
                                            className='outline-none bg-[#F6F6F6] border-solid border-[1px] border-[#F6F6F6] rounded-md px-[5px] py-[3px]'
                                        />
                                        <span className='absolute right-[10px] text-[#898F94]'>{`₫`}</span>
                                    </div>
                                </div>
                                <div className='inline-flex flex-col space-y-2'>
                                    <span>Biên lợi nhuận</span>
                                    <div className='relative flex items-center'>
                                        <input
                                            placeholder='--'
                                            className='outline-none bg-[#F6F6F6] border-solid border-[1px] border-[#F6F6F6] rounded-md px-[5px] py-[3px]'
                                        />
                                        <span className='absolute right-[10px] text-[#898F94]'>{`₫`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-[#fff] flex flex-col space-y-4 px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md'>
                            <span className='text-[14px] text-[#303030] font-semibold'>
                                Kho hàng
                            </span>
                            <div className='flex flex-col space-y-3'>
                                <div>
                                    <div className='inline-flex flex-col space-y-2'>
                                        <span>Số lượng</span>
                                        <input
                                            type='number'
                                            placeholder='0'
                                            className='outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                                        />
                                    </div>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <input
                                        id='QuantityOption'
                                        type='checkbox'
                                        className='w-[15px] h-[15px]'
                                    />
                                    <label
                                        htmlFor='QuantityOption'
                                        className='flex items-center'
                                    >
                                        <span className='text-[14px] text-[#616161]'>
                                            Tiếp tục bán khi hết hàng
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <ClassifyComponent />
                    </div>
                    <div className='w-[30%] flex flex-col space-y-2'>
                        <div className='flex flex-col space-y-2 bg-[#fff] px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md'>
                            <span className='text-[14px] text-[#303030] font-semibold'>
                                Trạng thái
                            </span>
                            <select
                                className='w-full flex items-center text-[14px] outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[10px] py-[8px]'
                                {...register('status', {
                                    required: true,
                                })}
                            >
                                <option value='Đang hoạt động'>
                                    Đang hoạt động
                                </option>
                                <option value='Hết hàng'>Hết hàng</option>
                                <option value='Bản nháp'>Bản nháp</option>
                            </select>
                        </div>
                        <div className='flex flex-col space-y-2 bg-[#fff] px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md'>
                            <span className='text-[14px] text-[#303030] font-semibold'>
                                Sắp xếp sản phẩm
                            </span>
                            <div className='flex flex-col space-y-2'>
                                <span className='text-[14px] text-[#303030]'>
                                    Danh mục sản phẩm
                                </span>
                                <select
                                    className='w-full flex items-center text-[14px] outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[10px] py-[8px]'
                                    {...register('category', {
                                        required: true,
                                    })}
                                >
                                    <option value='create_category'>
                                        Tạo danh mục mới
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button type='submit'>Submit</button>
            </div>
        </div>
    )
}

export default AddProduct

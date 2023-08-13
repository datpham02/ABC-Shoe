import React from 'react'
import { useForm } from 'react-hook-form'
import { AddCategory as AddCategoryType } from '~/utils/interface'

const AddCategoryComponent = ({ onClose }: AddCategoryType) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data: any) => console.log(data)
    return (
        <div className='fixed inset-0 z-[10] w-full h-full bg-[rgba(0,0,0,0.4)] flex items-center justify-center'>
            <form className='flex flex-col justify-between space-y-4 bg-[#fff] rounded-md px-[25px] py-[12.5px] w-[400px] h-[200px]'>
                <span className='text-[25px] font-medium text-[#303030]'>
                    Tạo danh mục mới
                </span>
                <div className='flex flex-col space-y-2'>
                    <span className='text-[14px] text-[#303030] font-semibold'>
                        Tên danh mục
                    </span>
                    <div className='flex flex-col space-y-2'>
                        <input
                            {...register('name', {
                                required: {
                                    value: true,
                                    message:
                                        'Không được để trống tên danh mục !',
                                },
                            })}
                            className='outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                        />
                        {errors.name && (
                            <p className='text-[red] text-[14px]'>
                                {errors.name.message as string}
                            </p>
                        )}
                    </div>
                </div>
                <div className='flex justify-center space-x-2 py-[15px]'>
                    <span
                        onClick={onClose}
                        className='w-[50%] text-center cursor-pointer px-[12px] py-[5px] text-[#fff] bg-[#CBCBCB] rounded-md'
                    >
                        Hủy
                    </span>
                    <input
                        type='button'
                        value='Submit'
                        onClick={handleSubmit(onSubmit)}
                        className='w-[50%] cursor-pointer px-[12px] py-[5px] text-[#fff] bg-[#CBCBCB] rounded-md'
                    />
                </div>
            </form>
        </div>
    )
}

export default AddCategoryComponent

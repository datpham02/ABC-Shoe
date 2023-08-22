import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

const AddClassifyComponent = () => {
    const { register } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        name: 'classify',
        shouldUnregister: true,
    })
    return (
        <div className='flex flex-col space-y-2'>
            {fields.map((fields, index) => (
                <div
                    key={fields.id}
                    className='relative flex flex-col space-y-4 px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md bg-[#fff]'
                >
                    <span
                        onClick={() => {
                            remove(index)
                        }}
                        className='absolute right-[0] top-[0] flex items-center justify-center px-[8px] py-[2px] cursor-pointer text-[18px] bg-[#000] text-[#Fff]'
                    >
                        x
                    </span>

                    <div className='flex flex-col space-y-2'>
                        <span className='text-[14px] text-[#303030] font-semibold'>
                            Kích cỡ
                        </span>
                        <div className='flex flex-col space-y-2'>
                            <input
                                {...register(`classify.${index}.size`, {
                                    required: {
                                        value: true,
                                        message:
                                            'Không được để trống kích cỡ !',
                                    },
                                })}
                                placeholder='0'
                                className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <span className='text-[14px] text-[#303030] font-semibold'>
                            Số lượng
                        </span>
                        <input
                            {...register(`classify.${index}.quantity`, {
                                required: {
                                    value: true,
                                    message: 'Không được để trống số lượng !',
                                },
                                valueAsNumber: true,
                            })}
                            placeholder='0'
                            className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                        />
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <div className='flex flex-col space-y-2'>
                            <span className='text-[14px] text-[#303030] font-semibold'>
                                Giá gốc
                            </span>
                            <div className='relative flex items-center'>
                                <input
                                    {...register(`classify.${index}.cost`, {
                                        required: {
                                            value: true,
                                            message:
                                                'Không được để trống giá gốc !',
                                        },
                                        valueAsNumber: true,
                                    })}
                                    placeholder='0'
                                    className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                                />
                                <span className='absolute right-[10px] text-[#898F94]'>{`₫`}</span>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <span className='text-[14px] text-[#303030] font-semibold'>
                                Giá bán
                            </span>
                            <div className='relative flex items-center'>
                                <input
                                    {...register(`classify.${index}.price`, {
                                        required: {
                                            value: true,
                                            message:
                                                'Không được để trống giá bán !',
                                        },
                                        valueAsNumber: true,
                                    })}
                                    placeholder='0'
                                    className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                                />
                                <span className='absolute right-[10px] text-[#898F94]'>{`₫`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <span
                onClick={() => {
                    append({ size: '', quantity: '', cost: '', price: '' })
                }}
                className='cursor-pointer w-full py-[10px] bg-[#000] text-[#fff] text-[18px] font-medium flex items-center justify-center'
            >
                Thêm trường phân loại
            </span>
        </div>
    )
}

export default AddClassifyComponent

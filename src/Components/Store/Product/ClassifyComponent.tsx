import React, { useEffect, useState, ChangeEvent } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { BiTrash } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'
import { ClassifyComponent as ClassifyComponentType } from '~/utils/interface'

const ClassifyComponent = ({ className }: ClassifyComponentType) => {
    const [name, setName] = useState<string>('')
    const {
        register,
        control,
        formState: { errors },
    } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'classify',
    })

    // useEffect(() => {
    //     append({ key: name, value: '' })
    // }, [])
    const handleNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleAddValueField = () => {
        append({ value: '' })
    }
    return (
        <div className={twMerge(className)}>
            <span className='text-[14px] text-[#303030] font-semibold'>
                Phân loại
            </span>
            <div className='flex flex-col space-y-3'>
                <div className='flex flex-col'>
                    {fields.map((item, index) => {
                        if (index == 0) {
                            return (
                                <div
                                    key={item.id}
                                    className='flex flex-col space-y-3 px-[40px]'
                                >
                                    <div className='flex flex-col space-y-2'>
                                        <span className='text-[14px] text-[#303030]'>
                                            Tên tùy chọn
                                        </span>
                                        <div className='w-full flex items-center space-x-5'>
                                            <input
                                                value={name}
                                                onChange={handleNameOnChange}
                                                className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                                            />
                                            <BiTrash className='text-[20px]' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col space-y-2'>
                                        <span className='text-[14px] text-[#303030]'>
                                            Giá trị tùy chọn
                                        </span>
                                        <div className='w-full flex items-center space-x-5'>
                                            <input
                                                {...register(
                                                    `${name}.${index}.value`,
                                                )}
                                                className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                                            />
                                            <BiTrash
                                                onClick={() => {
                                                    remove(index)
                                                }}
                                                className='text-[20px]'
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={item.id} className='px-[40px]'>
                                    <div className='flex flex-col space-y-2'>
                                        <span className='text-[14px] text-[#303030]'>
                                            Giá trị tùy chọn
                                        </span>
                                        <div className='w-full flex items-center space-x-5'>
                                            <input
                                                {...register(
                                                    `${name}.${index}.value`,
                                                )}
                                                className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                                            />
                                            <BiTrash
                                                onClick={() => {
                                                    remove(index)
                                                }}
                                                className='text-[20px]'
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div className='flex justify-start px-[40px]'>
                    <span
                        onClick={() => {
                            handleAddValueField()
                        }}
                        className='px-[10px] py-[5px] text-[14px] text-[#000] bg-[#fff] shadow-md rounded-md'
                    >
                        Thêm giá trị
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ClassifyComponent

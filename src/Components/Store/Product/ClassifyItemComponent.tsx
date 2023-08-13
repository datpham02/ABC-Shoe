import { BiTrash } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { ClassifyItemComponent as ClassifyItemComponentType } from '~/utils/interface'
import { useFormContext } from 'react-hook-form'
import useDebounce from '~/utils/hook/useDebounce'

const ClassifyItemComponent = ({
    index,
    className,
    onRemove,
}: ClassifyItemComponentType) => {
    const { register, unregister, setValue, watch } = useFormContext()
    const [name, setName] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])

    const handleNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (watch(name) != undefined) {
            unregister(name)
            setName(e.target.value)
        } else setName(e.target.value)
    }
    const handleAddTag = (e: any) => {
        if (e.code == 'Enter' && e.target.value != '') {
            setTags([...tags, e.target.value])
            if (name != '') {
                setValue(name, tags.join())
            }
            e.target.value = ''
        }
    }
    const handleRemoveTag = (indexTag: number) => {
        const newDataTag = tags.filter((_, index) => index != indexTag)

        setTags(newDataTag)
    }

    return (
        <div
            className={twMerge(
                'flex flex-col space-y-4 px-[20px] py-[15px]',
                className,
            )}
        >
            <div className='flex items-center justify-between'>
                <span className='cursor-pointer text-[14px] text-[#303030] font-semibold'>
                    Phân loại
                </span>
                <BiTrash
                    onClick={() => {
                        onRemove(index)
                    }}
                    className='text-[20px]'
                />
            </div>
            <div className='flex flex-col space-y-3'>
                <div className='flex flex-col space-y-3 px-[40px]'>
                    <div className='flex flex-col space-y-2'>
                        <span className='text-[14px] text-[#303030]'>
                            Tên tùy chọn
                        </span>
                        <input
                            value={name}
                            onChange={handleNameOnChange}
                            className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                        />
                        {name != '' && (
                            <input
                                hidden
                                {...register(name, {
                                    required: {
                                        value: true,
                                        message:
                                            'Không được để trống giá trị !',
                                    },
                                })}
                            />
                        )}
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <span className='text-[14px] text-[#303030]'>
                            Giá trị tùy chọn
                        </span>
                        <div className='flex items-center flex-wrap gap-2 border-solid border-[1px] border-[#898F94] rounded-md px-[8px] py-[6px]'>
                            {tags.map((tag, index) => (
                                <div
                                    key={tag + index}
                                    className='flex items-center space-x-2 cursor-default bg-[#000] text-[#fff] text-center px-[6px] py-[3px] rounded-sm '
                                >
                                    <span>{tag}</span>
                                    <span
                                        onClick={() => {
                                            handleRemoveTag(index)
                                        }}
                                        className='cursor-pointer'
                                    >
                                        x
                                    </span>
                                </div>
                            ))}
                            <input
                                onKeyUp={(e) => {
                                    handleAddTag(e)
                                }}
                                className='outline-none border-none'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassifyItemComponent

import React, { ChangeEvent, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'
import { ClassifyItemComponent as ClassifyItemComponentType } from '~/utils/interface'

const ClassifyItemComponent = ({
    index,
    className,
    onRemove,
}: ClassifyItemComponentType) => {
    const [name, setName] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])

    const handleNameOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleAddTag = (e: any) => {
        if (e.code == 'Enter' && e.target.value != '') {
            setTags([...tags, e.target.value])
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
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <span className='text-[14px] text-[#303030]'>
                            Giá trị tùy chọn
                        </span>
                        <div className='flex items-center flex-wrap gap-2 border-solid border-[1px] border-[#898F94] rounded-md px-[8px] py-[6px]'>
                            {tags.map((tag, index) => (
                                <div className='flex items-center space-x-2 cursor-default bg-[#000] text-[#fff] text-center px-[6px] py-[3px] rounded-sm '>
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
                                onKeyUp={handleAddTag}
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

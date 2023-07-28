import React, { useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'
import { ClassifyComponent as ClassifyComponentType } from '~/utils/interface'
type Classify = {
    name: string
    value: string[]
}
const ClassifyComponent = ({ className }: ClassifyComponentType) => {
    const [classify, setClassify] = useState<Classify[]>([
        { name: '', value: [] },
    ])
    const handleClassisyOnchange = () => {}
    return (
        <div className={twMerge(className)}>
            <span className='text-[14px] text-[#303030] font-semibold'>
                Phân loại
            </span>
            <div className='flex flex-col'>
                {classify.map((data: Classify, index) => (
                    <div
                        key={data.name + index}
                        className='flex flex-col space-y-3 px-[40px]'
                    >
                        <div className='flex flex-col space-y-2'>
                            <span className='text-[14px] text-[#303030]'>
                                Tên tùy chọn
                            </span>
                            <div className='w-full flex items-center space-x-5'>
                                <input className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]' />
                                <BiTrash className='text-[20px]' />
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <span className='text-[14px] text-[#303030]'>
                                Giá trị tùy chọn
                            </span>
                            {data.value.map((value) => (
                                <div className='w-full flex items-center space-x-5'>
                                    <input value={value} className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]' />
                                    <BiTrash className='text-[20px]' />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ClassifyComponent

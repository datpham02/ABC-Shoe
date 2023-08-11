import React, { useEffect, useState, ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { ClassifyComponent as ClassifyComponentType } from '~/utils/interface'
import ClassifyItemComponent from './ClassifyItemComponent'

const ClassifyComponent = ({ className }: ClassifyComponentType) => {
    const [classify, setClassify] = useState<number[]>([1])

    const handleAddClassifyItem = () => {
        setClassify([...classify, classify[classify.length - 1] + 1])
    }
    const handleRemoveClassifyItem = (indexClassify: number) => {
        const newClassifyData = classify.filter(
            (_, index) => index != indexClassify,
        )
        setClassify(newClassifyData)
    }

    return (
        <div
            className={twMerge(
                'flex flex-col bg-[#fff] shadow-sm border-solid border-[1px] rounded-md',
                className,
            )}
        >
            {classify.map((classify, index) => (
                <ClassifyItemComponent
                    key={classify}
                    index={index}
                    onRemove={handleRemoveClassifyItem}
                />
            ))}
            <div
                onClick={handleAddClassifyItem}
                className='cursor-pointer flex items-center justify-center bg-[#000] text-[#fff] font-medium text-[16px] py-[10px] '
            >
                Thêm trường phân loại
            </div>
        </div>
    )
}

export default ClassifyComponent

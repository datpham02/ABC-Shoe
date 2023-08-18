import React, { useEffect, useState } from 'react'
type Classify = {
    id: string
    size: string
    quantity: number
    createAt: string
    updateAt: string
    productId: string
}

const SizeComponent = ({
    data,
    sizeSelect,
    handleSelectSize,
}: {
    data: Classify[]
    sizeSelect: Classify
    handleSelectSize: (size: Classify) => void
}) => {
    return (
        <div className='flex flex-wrap gap-2'>
            {data?.map((size: Classify) => {
                if (size.size == sizeSelect.size) {
                    return (
                        <span
                            key={size.id}
                            className='cursor-pointer px-[12px] py-[6px] text-center bg-[#000] border-solid border-[#000] border-[1px] text-[#fff]'
                        >
                            {size.size}
                        </span>
                    )
                } else
                    return (
                        <span
                            key={size.id}
                            onClick={() => {
                                handleSelectSize(size)
                            }}
                            className='cursor-pointer px-[12px] py-[6px] text-center border-solid border-[#000] border-[1px] text-[#000]'
                        >
                            {size.size}
                        </span>
                    )
            })}
        </div>
    )
}
export default SizeComponent

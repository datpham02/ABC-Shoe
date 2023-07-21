import React, { useEffect, useState } from 'react'
import { SizeComponent } from '~/utils/interface'

const SizeComponent = ({ data }: SizeComponent) => {
    const [sizeSelect, setSizeSelect] = useState<string>('')

    useEffect(() => {
        if (data.length > 0) {
            setSizeSelect(data[0])
        }
    }, [data])
    const handleSelectSize = (size: string) => {
        setSizeSelect(size)
    }
    return (
        <div className='flex flex-wrap gap-2'>
            {data?.map((size) => {
                if (size == sizeSelect) {
                    return (
                        <span
                            key={size}
                            className='cursor-pointer px-[12px] py-[6px] text-center bg-[#000] border-solid border-[#000] border-[1px] text-[#fff]'
                        >
                            {size}
                        </span>
                    )
                } else
                    return (
                        <span
                            key={size}
                            onClick={() => {
                                handleSelectSize(size)
                            }}
                            className='cursor-pointer px-[12px] py-[6px] text-center border-solid border-[#000] border-[1px] text-[#000]'
                        >
                            {size}
                        </span>
                    )
            })}
        </div>
    )
}
export default SizeComponent

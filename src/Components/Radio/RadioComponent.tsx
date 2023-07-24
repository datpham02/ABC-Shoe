import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { RadioComponent as RadioComponentType } from '~/utils/interface'

const RadioComponent = ({ className, checked = false }: RadioComponentType) => {
    return (
        <span
            className={twMerge(
                'rounded-full w-[20px] h-[20px] border-solid border-[1px]  flex items-center justify-center p-[5px]',
                checked ? 'border-[#d5060a]' : 'border-[#BDBDBD]',
                className,
            )}
        >
            {checked ? (
                <span className='w-full h-full rounded-full bg-[red]'></span>
            ) : null}
        </span>
    )
}

export default RadioComponent

import React, { ChangeEvent, useState } from 'react'

const QuantityComponent = ({
    quantity,
    handleQuantityOnchange,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
}: {
    quantity: number
    handleQuantityOnchange: (e: ChangeEvent<HTMLInputElement>) => void
    handleIncreaseQuantity: () => void
    handleDecreaseQuantity: () => void
}) => {
    return (
        <div className='flex justify-center items-center space-x-4 rounded-full border-solid border-[2px] border-[#000] w-[120px] px-[15px] py-[5px]'>
            <span
                onClick={() => {
                    handleDecreaseQuantity()
                }}
                className='cursor-pointer text-[20px] select-none font-bold'
            >
                -
            </span>
            <input
                value={quantity}
                onChange={handleQuantityOnchange}
                inputMode='numeric'
                className='outline-none text-center w-[20px] font-bold'
            />
            <span
                onClick={() => {
                    handleIncreaseQuantity()
                }}
                className='cursor-pointer text-[20px] select-none font-bold'
            >
                +
            </span>
        </div>
    )
}

export default QuantityComponent

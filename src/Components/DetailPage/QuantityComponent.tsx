import React, { ChangeEvent, useState } from 'react'

const QuantityComponent = () => {
    const [quantity, setQuantity] = useState<number>(1)

    const quantityProduct = 99
    const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        if (
            typeof Number(e.target.value) == 'number' &&
            Number(e.target.value) >= 0
        ) {
            if (Number(e.target.value) > quantityProduct) {
                setQuantity(quantityProduct)
            } else {
                setQuantity(Number(e.target.value))
            }
        }
    }
    const handleIncreaseQuantity = () => {
        if (quantity < quantityProduct) {
            setQuantity(quantity + 1)
        }
    }
    const handleDecreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }
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
                onChange={handleOnchange}
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

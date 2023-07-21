import React, { ChangeEvent, useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { formatVietnameseDong } from '~/utils/func'

const CartItemComponent = () => {
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
        <tr>
            <td className='w-[100px]'>
                <img src='https://product.hstatic.net/200000384421/product/air-jordan-1-low-white-black-dar_a0a9f1d4c551454392aadb9bb7738cf3_medium.png' />
            </td>
            <td>
                <div className='flex flex-col justify-center'>
                    <span className='font-semibold text-[blue]'>
                        Giày Nike Air Jordan 1 Retro Low OG 'Powder Blue'
                        CZ0790-104
                    </span>
                    <div className='flex items-center'>
                        <span>Size: </span>
                        <span>36</span>
                    </div>
                </div>
            </td>
            <td>
                <div className='text-start text-[#D5060A] font-semibold text-[18px]'>
                    {formatVietnameseDong(5000000)}
                </div>
            </td>
            <td>
                <div className='flex items-center justify-center'>
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
                </div>
            </td>
            <td>
                <div className='text-start text-[#D5060A] font-semibold text-[18px]'>
                    {formatVietnameseDong(5000000 * quantity)}
                </div>
            </td>
            <td>
                <div className='flex items-center justify-center'>
                    <GrClose className='text-[20px] cursor-pointer' />
                </div>
            </td>
        </tr>
    )
}

export default CartItemComponent

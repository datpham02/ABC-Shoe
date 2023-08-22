import React, { useEffect, useState } from 'react'
type Product = {
    parentProductId: any
    id: string
    name: string
    image: string[]
    cost: number
    price: number
    quantity: number
    size: string
    description: string
    createAt: string
    updateAt: string
    status: string
    productChild: ProductChild[]
    category: Category
}

type ProductChild = {
    id: string
    name: string
    image: string[]
    cost: number
    price: number
    description: string
    createAt: string
    updateAt: string
    status: string
    category: Category
    size: string
    quantity: number
}

type Category = {
    name: string
    id: string
}

const SizeComponent = ({
    data,
    productSelect,
    handleSelectProduct,
}: {
    data: Product[] | ProductChild[]
    productSelect: Product | ProductChild
    handleSelectProduct: (product: Product | ProductChild) => void
}) => {
    return (
        <div className='flex flex-wrap gap-2'>
            {data?.map((product: Product | ProductChild) => {
                if (product.size == productSelect.size) {
                    return (
                        <span
                            key={product.id}
                            className='cursor-pointer px-[12px] py-[6px] text-center bg-[#000] border-solid border-[#000] border-[1px] text-[#fff]'
                        >
                            {product.size}
                        </span>
                    )
                } else
                    return (
                        <span
                            key={product.id}
                            onClick={() => {
                                handleSelectProduct(product)
                            }}
                            className='cursor-pointer px-[12px] py-[6px] text-center border-solid border-[#000] border-[1px] text-[#000]'
                        >
                            {product.size}
                        </span>
                    )
            })}
        </div>
    )
}
export default SizeComponent

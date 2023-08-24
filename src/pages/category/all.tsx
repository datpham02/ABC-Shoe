import { LoadingComponent, ProductGridItemComponent } from '~/Components'

import Link from 'next/link'
import ProductGridComponent from '~/Components/Grid/ProductGridComponent'
import React from 'react'
import axios from 'axios'
import { convertToSlug } from '~/utils/func'
import { useQuery } from '@tanstack/react-query'

const All = () => {
    const { data: all_product, isLoading } = useQuery({
        queryKey: ['all_product'],
        queryFn: async () => {
            const { data } = await axios.get('/api/get/product?all=true')
            return data.products
        },
    })
    return (
        <>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <div className='px-[150px] h-screen mt-[20px] flex flex-col space-y-4'>
                    <div className='flex justify-center items-center'>
                        <h1 className='text-[30px]'>Tất cả sản phẩm</h1>
                    </div>
                    <div className='flex justify-center py-[15px]'>
                        <div className='w-[80%] h-[1px] bg-[#000]'></div>
                    </div>
                    <ProductGridComponent>
                        {all_product?.map((product: any) => (
                            <Link
                                key={product.id}
                                href={`/product/${product?.slug}`}
                                className='flex justify-center'
                            >
                                <ProductGridItemComponent
                                    name={product.name}
                                    img={product.image[0]}
                                    description={product.description}
                                    price={product.price}
                                />
                            </Link>
                        ))}
                    </ProductGridComponent>
                </div>
            )}
        </>
    )
}

export default All

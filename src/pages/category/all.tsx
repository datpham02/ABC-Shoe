import axios from 'axios'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Breadcrumbs } from '@material-tailwind/react'
import Link from 'next/link'
import { ProductComponent } from '~/Components'
import ProductGridComponent from '~/Components/Grid/ProductGridComponent'
import { convertToSlug } from '~/utils/func'

const all = () => {
    const { data: all_product } = useQuery({
        queryKey: ['all_product'],
        queryFn: async () => {
            const { data } = await axios.get('/api/get/product?all=true')
            return data.products
        },
    })
    return (
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
                        href={`/product?product_name=${convertToSlug(
                            product.name,
                        )}&&id=${product.id}`}
                    >
                        <ProductComponent
                            name={product.name}
                            img={product.image[0]}
                            description={product.description}
                            price={product.price}
                        />
                    </Link>
                ))}
            </ProductGridComponent>
        </div>
    )
}

export default all

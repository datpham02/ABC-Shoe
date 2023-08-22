import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { ProductComponent } from '~/Components'
import ProductGridComponent from '~/Components/Grid/ProductGridComponent'
import { convertToSlug } from '~/utils/func'
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

const id = ({
    products,
    category,
}: {
    products: Product[]
    category: Category
}) => {
    return (
        <div className='px-[150px] h-screen mt-[20px] flex flex-col space-y-4'>
            {products ? (
                category ? (
                    <>
                        <div className='flex justify-center items-center'>
                            <h1 className='text-[30px]'>{category?.name}</h1>
                        </div>
                        <div className='flex justify-center py-[15px]'>
                            <div className='w-[80%] h-[1px] bg-[#000]'></div>
                        </div>
                        {products.length > 0 ? (
                            <ProductGridComponent>
                                {products?.map((product: any) => (
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
                        ) : (
                            <div className='w-full h-screen flex  justify-center'>
                                <span className='text-[#576574] text-[20px] font-medium'>
                                    Hết sản phảm
                                </span>
                            </div>
                        )}
                    </>
                ) : (
                    <div className='w-full h-screen skeleton'></div>
                )
            ) : (
                <div className='w-full h-screen skeleton'></div>
            )}
        </div>
    )
}

export default id

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const baseUrl =
        process.env.NODE_ENV == 'production'
            ? process.env.NEXT_PUBLIC_BASE_URL
            : 'http://localhost:3000'
    if (context?.params?.id) {
        const reponse = await fetch(
            `${baseUrl}/api/get/product?categoryId=${context.params.id}`,
            {
                method: 'get',
            },
        )
        const result = await reponse.json()

        return {
            props: {
                products: result.products,
                category: result.category,
            },
        }
    }
    return { notFound: true }
}

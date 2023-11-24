import { GetStaticPaths, GetStaticProps } from 'next'
import {
    FooterComponent,
    LoadingComponent,
    MetaComponent,
    ProductGridItemComponent,
} from '~/Components'

import Link from 'next/link'
import ProductGridComponent from '~/Components/Grid/ProductGridComponent'
import React, { useEffect, useState } from 'react'
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
    slug: string
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
    slug: string
    id: string
    product: Product[]
}

const id = ({ category }: { category: Category }) => {
    const [currentPageURL, setCurrentPageURL] = useState('')

    useEffect(() => {
        setCurrentPageURL(window.location.href)
    }, [])
    return (
        <>
            <MetaComponent
                title={category?.name}
                description={
                    'Danh Mục ABCShoe: Khám Phá Thế Giới Đa Dạng Của Giày Dép'
                }
                image={'./abc.png'}
                url={currentPageURL}
            />
            {category ? (
                <div className='h-auto flex flex-col space-y-4'>
                    <div className='px-[150px] h-full w-full mt-[20px] flex flex-col space-y-4'>
                        <div className='flex justify-center items-center'>
                            <h1 className='text-[30px]'>{category?.name}</h1>
                        </div>
                        <div className='flex justify-center py-[15px]'>
                            <div className='w-[80%] h-[1px] bg-[#000]'></div>
                        </div>
                        {category?.product.length > 0 ? (
                            <ProductGridComponent>
                                {category.product?.map((product: Product) => (
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
                        ) : (
                            <div className='w-full h-screen flex  justify-center'>
                                <span className='text-[#576574] text-[20px] font-medium'>
                                    Hết sản phảm
                                </span>
                            </div>
                        )}
                    </div>
                    <FooterComponent />
                </div>
            ) : (
                <LoadingComponent />
            )}
        </>
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
    if (context?.params?.slug) {
        const reponse = await fetch(
            `${baseUrl}/api/get/category?slug=${context.params.slug}`,
            {
                method: 'get',
            },
        )
        const result = await reponse.json()

        return {
            props: {
                category: result.category,
            },
        }
    }
    return { notFound: true }
}

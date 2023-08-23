import React, { useEffect, useState } from 'react'
import {
    FooterComponent,
    LoadingComponent,
    MetaComponent,
    ProductGridItemComponent,
} from '~/Components'
import Link from 'next/link'
import ProductGridComponent from '~/Components/Grid/ProductGridComponent'
import axios from 'axios'
import { convertToSlug } from '~/utils/func'
import dynamic from 'next/dynamic'
import { useQuery } from '@tanstack/react-query'

const SliderComponent = dynamic(
    () => import('../Components/Silder/SliderComponent'),
    { ssr: false },
)
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
    id: string
}
const settingSlider = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
}

const Home = () => {
    const [currentPageURL, setCurrentPageURL] = useState('')

    useEffect(() => {
        setCurrentPageURL(window.location.href)
    }, [])
    const { data: newProducts, isLoading } = useQuery({
        queryKey: ['new_product'],
        queryFn: async () => {
            const { data } = await axios.get(
                '/api/get/product?new_product=true',
            )
            return data.products
        },
    })

    return (
        <>
            <MetaComponent
                title='ABCShoe - Nơi trải nghiệm mua sắm giày thời trang đa dạng và chất lượng'
                image='./abc.png'
                description='ABCShoe - Khám phá bộ sưu tập đa dạng giày thời trang cho nam, nữ và trẻ em. Chất lượng hàng đầu, kiểu dáng đa dạng, đảm bảo sẽ đáp ứng nhu cầu mua sắm của bạn.'
                url={currentPageURL}
            />
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <div className='flex flex-col space-y-4 h-screen '>
                    <SliderComponent settings={settingSlider} className='flex'>
                        {[1, 2, 3, 4].map((index) => (
                            <div
                                key={index}
                                className='outline-none h-[600px] w-full'
                            >
                                <img
                                    alt={`home`}
                                    className='w-full h-full object-cover'
                                    src={`https://theme.hstatic.net/200000384421/1000955298/14/home_slider_image_${index}.jpg?v=23`}
                                />
                            </div>
                        ))}
                    </SliderComponent>
                    <div className='px-[150px] mt-[20px] flex flex-col space-y-4'>
                        <div className='flex justify-center items-center'>
                            <h1 className='text-[30px]'>Sản Phẩm Mới</h1>
                        </div>
                        <ProductGridComponent>
                            {newProducts?.map((product: Product) => (
                                <Link
                                    key={product.id}
                                    href={`/product/${product?.slug}`}
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
                    <FooterComponent />
                </div>
            )}
        </>
    )
}

export default Home

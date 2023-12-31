import {
    GetServerSideProps,
    GetServerSidePropsContext,
    GetStaticPaths,
    GetStaticProps,
} from 'next'
import {
    LoadingComponent,
    MetaComponent,
    ProductGridItemComponent,
    SizeComponent,
    SliderComponent,
} from '~/Components'
import React, { ChangeEvent, useEffect, useState } from 'react'
import {
    capitalizeWords,
    convertToSlug,
    formatVietnameseDong,
    providers_share,
} from '~/utils/func'
import { useMutation, useQuery } from '@tanstack/react-query'

import { Breadcrumbs } from '@material-tailwind/react'
import Link from 'next/link'
import ProductGridComponent from '~/Components/Grid/ProductGridComponent'
import QuantityComponent from '~/Components/DetailPage/QuantityComponent'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import queryClient from '~/lib/use_query'

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

type CartItem = {
    productId: string
    quantity: number
}

const settingSlider = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
}
const ProductName = ({ product }: { product: Product }) => {
    const [currentPageURL, setCurrentPageURL] = useState('')

    useEffect(() => {
        setCurrentPageURL(window.location.href)
    }, [])
    const { data: category_product, isLoading } = useQuery({
        queryKey: ['category_product'],
        queryFn: async () => {
            const { data } = await axios.get(
                `/api/get/product?categoryId=${product.category.id}`,
            )
            return data.products
        },
    })
    const [productSelect, setProductSelect] = useState<Product | ProductChild>(
        product,
    )
    const [quantity, setQuantity] = useState<number>(1)
    const { mutate, isLoading: isLoadingAddProductToCart } = useMutation({
        mutationKey: ['add_cart_item'],
        mutationFn: async (CartItem: CartItem) => {
            const { data } = await axios.post('/api/cart/add', {
                cartItem: CartItem,
            })
            return data
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.dismiss()
                toast.success('Thêm sản phẩm vào giỏ hàng thành công !')
                queryClient.refetchQueries(['get_cart'])
            } else {
                toast.dismiss()
                toast.error(data.msg)
            }
        },
        onError: () => {
            toast.dismiss()
            toast.error('Có lỗi xảy ra, xin hãy f5 lại để tiếp tục !')
        },
    })
    const handleSelectProduct = (product: Product | ProductChild) => {
        setProductSelect(product)
    }
    const handleQuantiyOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        if (
            typeof Number(e.target.value) == 'number' &&
            Number(e.target.value) >= 0
        ) {
            if (Number(e.target.value) > productSelect.quantity) {
                setQuantity(productSelect.quantity)
            } else {
                setQuantity(Number(e.target.value))
            }
        }
    }
    const handleIncreaseQuantity = () => {
        if (quantity < productSelect.quantity) {
            setQuantity(quantity + 1)
        }
    }
    const handleDecreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    const handleAddToCart = () => {
        toast.loading('Đang thêm sản phẩm vào giỏ hàng')
        mutate({
            productId: productSelect.id,
            quantity: quantity,
        })
    }

    if (product) {
        return (
            <>
                <MetaComponent
                    url={currentPageURL}
                    title={product?.name}
                    description={product?.description}
                    image={product?.image[0]}
                />
                <div className='flex flex-col space-y-10'>
                    <div className='bg-[#E9EAEB] h-[50px] flex items-center justify-start xl:px-[150px]'>
                        <Breadcrumbs className='bg-[#E9EAEB]'>
                            <Link href='/' className='opacity-60'>
                                Trang chủ
                            </Link>
                            <Link
                                href={`/catogry/${product?.category.id}`}
                                className='opacity-60'
                            >
                                {capitalizeWords(product?.category?.name)}
                            </Link>
                            <Link href={currentPageURL}>{product?.name}</Link>
                        </Breadcrumbs>
                    </div>
                    <div className='flex xl:flex-row flex-col xl:space-y-0 space-y-3 xl:space-x-8 xl:px-[150px] px-[50px]'>
                        <div className='flex flex-col space-y-3'>
                            <SliderComponent
                                settings={settingSlider}
                                className='flex xl:w-[560px] xl:h-[360px] w-full h-[500px]'
                            >
                                {product?.image.map((img, index) => (
                                    <div
                                        key={img + index}
                                        className='outline-none overflow-hidden'
                                    >
                                        <img
                                            className='xl:w-[560px] xl:h-[360px] w-full h-[500px] object-contain'
                                            alt={product.name}
                                            src={img}
                                        />
                                    </div>
                                ))}
                            </SliderComponent>
                            <div className='flex items-center justify-end space-x-2 '>
                                {providers_share.map(
                                    (provider: {
                                        icon: string
                                        name: string
                                        link: (
                                            url: string,
                                            title: string,
                                        ) => string
                                    }) => {
                                        return (
                                            <a
                                                key={provider.name}
                                                target='_blank'
                                                href={provider?.link(
                                                    currentPageURL,
                                                    product.name,
                                                )}
                                            >
                                                <div className='w-[40px] h-[40px] rounded-full'>
                                                    <img
                                                        className='w-full h-full object-contain'
                                                        src={provider?.icon}
                                                        alt={provider?.name}
                                                    />
                                                </div>
                                            </a>
                                        )
                                    },
                                )}
                            </div>
                        </div>

                        <div className='flex flex-col space-y-6'>
                            <div className='flex flex-col'>
                                <span className='font-medium text-[#000] text-[18px]'>
                                    {product.name}
                                </span>
                                <div className='flex items-center space-x-2 font-thin text-[14px]'>
                                    <span>SKU:</span>
                                    <span>{product.id}</span>
                                </div>
                                <span className='text-[#d5060a] text-[25px] font-medium'>
                                    {formatVietnameseDong(product.price)}
                                </span>
                            </div>

                            <SizeComponent
                                data={[product, ...product.productChild]}
                                productSelect={product}
                                handleSelectProduct={handleSelectProduct}
                            />
                            <div>
                                <span className='font-bold text-[18px]'>
                                    Liên hệ mua hàng:
                                </span>
                                <div>
                                    <div className='flex items-center space-x-2'>
                                        <span>
                                            138A,Quốc Lộ1A,Phường Bình Hưng Hòa
                                            B,Quân Bình Tân,TPHCM:
                                        </span>
                                        <span className='font-medium text-[blue]'>
                                            0798161321
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <QuantityComponent
                                    quantity={quantity}
                                    handleQuantityOnchange={
                                        handleQuantiyOnchange
                                    }
                                    handleIncreaseQuantity={
                                        handleIncreaseQuantity
                                    }
                                    handleDecreaseQuantity={
                                        handleDecreaseQuantity
                                    }
                                />
                                <button
                                    onClick={
                                        isLoadingAddProductToCart
                                            ? () => {}
                                            : handleAddToCart
                                    }
                                    disabled={isLoadingAddProductToCart}
                                    className='uppercase font-medium text-[15px] px-[25px] py-[10px] text-center bg-[#d5060a] text-[#fff] rounded-full'
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <details className='rounded-lg' open>
                                    <summary className='text-[20px] text-slate-90 font-semibold select-none'>
                                        Thông tin sản phẩm ?
                                    </summary>
                                    <div className='mt-3 text-sm leading-6 text-slate-600'>
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: product.description,
                                            }}
                                        />
                                    </div>
                                </details>
                                <details className='rounded-lg' open>
                                    <summary className='text-[20px] text-slate-90 font-semibold select-none'>
                                        Đổi trả miễn phí ?
                                    </summary>
                                    <div className='mt-3 text-sm leading-6 text-slate-600'>
                                        <p>
                                            Thật khó chịu nếu như bạn mua một
                                            đôi giày hiệu về nhưng lại không vừa
                                            size hoặc chỉ đơn giản là thay đổi ý
                                            thích của bản thân và không được đổi
                                            trả… Chính vì vậy, ABCShoe cam kết
                                            đem đến cho khách hàng trải nghiệm
                                            mua sắm hàng hiệu hài lòng nhất: quý
                                            khách hàng có thể đổi/ trả lại sản
                                            phẩm mới mua trong vòng 7 ngày kể từ
                                            ngày nhận hàng.
                                        </p>
                                    </div>
                                </details>
                                <details className='rounded-lg' open>
                                    <summary className='text-[20px] text-slate-90 font-semibold select-none'>
                                        Giao hàng nhanh chóng
                                    </summary>
                                    <div className='mt-3 text-sm leading-6 text-slate-600'>
                                        <p>
                                            Giao hàng nhanh, chính xác và đúng
                                            hẹn cho các đơn hàng luôn là tiêu
                                            chí hàng đầu mà ABCShoe đặt ra.
                                            Khách hàng có thể an tâm khi đặt
                                            niềm tin ở ABCShoe, các sản phẩm quí
                                            khách lựa chọn sẽ luôn đến tay quý
                                            khách với trải nghiệm tuyệt vời
                                            nhất.
                                        </p>
                                    </div>
                                </details>
                            </div>
                        </div>
                    </div>
                    {category_product ? (
                        <div className='xl:px-[150px] px-[50px] py-[20px]  flex flex-col space-y-4'>
                            <div className='flex justify-center items-center'>
                                <span className='text-[30px]'>
                                    Sản Phẩm Liên Quan
                                </span>
                            </div>
                            <div className='flex justify-center py-[15px]'>
                                <div className='w-[80%] h-[1px] bg-[#000]'></div>
                            </div>
                            <ProductGridComponent>
                                {category_product?.map((product: any) => (
                                    <Link
                                        key={product?.id}
                                        href={`/product/${product?.slug}`}
                                        className='flex justify-center'
                                    >
                                        <ProductGridItemComponent
                                            name={product?.name}
                                            img={product?.image[0]}
                                            description={product?.description}
                                            price={product?.price}
                                        />
                                    </Link>
                                ))}
                            </ProductGridComponent>
                        </div>
                    ) : null}
                </div>
            </>
        )
    } else {
        return <LoadingComponent />
    }
}

export default ProductName
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
    const slug = context?.params?.slug

    if (slug) {
        const reponse = await fetch(`${baseUrl}/api/get/product?slug=${slug}`, {
            method: 'get',
        })
        const result = await reponse.json()
        return {
            props: {
                product: result.product,
            },
        }
    }

    return { notFound: true }
}

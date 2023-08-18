import React, { ChangeEvent, useState } from 'react'
import Head from 'next/head'
import { ProductComponent, SizeComponent, SliderComponent } from '~/Components'
import PathComponent from '~/Components/Path/PathComponent'
import QuantityComponent from '~/Components/DetailPage/QuantityComponent'
import { convertToSlug, formatVietnameseDong } from '~/utils/func'
import ProductGridComponent from '~/Components/Grid/ProductGridComponent'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { useSession } from 'next-auth/react'

type Product = {
    id: string
    name: string
    image: string[]
    price: number
    cost: number
    description: string
    createAt: string
    updateAt: string
    status: string
    category: Category
    classify: Classify[]
}
type Category = {
    name: string
    id: string
}
type Classify = {
    id: string
    size: string
    quantity: number
    createAt: string
    updateAt: string
    productId: string
}

type CartItem = {
    product: {
        id: string
        name: string
        img: string
        classify: {
            size: string
            id: string
        }
        price: number
    }
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
    const { data: sessionData } = useSession()
    const data = [
        {
            name: 'trang chủ',
            href: '/',
        },
        {
            name: product.category.name,
            href: `/categort?name=${convertToSlug(product.category.name)}&&id=${
                product.category.id
            }`,
        },
    ]

    const [sizeSelect, setSizeSelect] = useState<Classify>(product.classify[0])
    const [quantity, setQuantity] = useState<number>(1)
    const { mutate } = useMutation({
        mutationKey: ['add_cart_item'],
        mutationFn: async (CartItem: CartItem) => {
            const { data } = await axios.post('/api/cart/add', {
                userId: sessionData?.user.id,
                cartItem: CartItem,
            })
            return data
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success('Thêm sản phẩm vào giỏ hàng thành công !')
            } else toast.error('Thêm sản phẩm vào giỏ hàng thất bại !')
        },
        onError: () => {
            toast.error('Thêm sản phẩm vào giỏ hàng thất bại !')
        },
    })
    const handleSelectSize = (size: Classify) => {
        setSizeSelect(size)
    }
    const handleQuantiyOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        if (
            typeof Number(e.target.value) == 'number' &&
            Number(e.target.value) >= 0
        ) {
            if (Number(e.target.value) > sizeSelect.quantity) {
                setQuantity(sizeSelect.quantity)
            } else {
                setQuantity(Number(e.target.value))
            }
        }
    }
    const handleIncreaseQuantity = () => {
        if (quantity < sizeSelect.quantity) {
            setQuantity(quantity + 1)
        }
    }
    const handleDecreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1)
        }
    }

    const handleAddToCart = () => {
        mutate({
            product: {
                id: product.id,
                name: product.name,
                img: product.image[0],
                classify: {
                    size: sizeSelect.size,
                    id: sizeSelect.id,
                },
                price: product.price,
            },
            quantity: quantity,
        })
    }
    return (
        <div>
            <Head>
                {/* <!-- Open Graph / Facebook --> */}
                <meta property='og:type' content='website' />
                <title>{product.name}</title>
                <meta
                    property='og:url'
                    content={`${
                        process.env.NEXT_PUBLIC_BASE_URL
                    }?product__name=${convertToSlug(product.name)}&&id=${
                        product.id
                    }`}
                />
                <meta property='og:description' content={product.description} />
                <meta property='og:image' content={product.image[0]} />

                {/* <!-- Twitter --> */}
                <meta property='twitter:card' content='summary_large_image' />
                <meta
                    property='twitter:url'
                    content={`${
                        process.env.NEXT_PUBLIC_BASE_URL
                    }?product__name=${convertToSlug(product.name)}&&id=${
                        product.id
                    }`}
                />
                <meta property='twitter:title' content={product.name} />
                <meta
                    property='twitter:description'
                    content={product.description}
                />
                <meta property='twitter:image' content={product.image[0]} />
            </Head>
            <div className='flex flex-col space-y-10'>
                <PathComponent
                    className='px-[150px] bg-[#F5F5F5]  py-[20px]'
                    data={data}
                />
                <div className='flex space-x-8 px-[150px]'>
                    <SliderComponent
                        settings={settingSlider}
                        className='flex w-[560px] h-[360px]'
                    >
                        {product?.image.map((img, index) => (
                            <div
                                key={img + index}
                                className='outline-none overflow-hidden'
                            >
                                <img
                                    className='w-[560px] h-[360px] object-cover'
                                    alt={product.name}
                                    src={img}
                                />
                            </div>
                        ))}
                    </SliderComponent>
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
                            data={product.classify}
                            sizeSelect={sizeSelect}
                            handleSelectSize={handleSelectSize}
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
                                handleQuantityOnchange={handleQuantiyOnchange}
                                handleIncreaseQuantity={handleIncreaseQuantity}
                                handleDecreaseQuantity={handleDecreaseQuantity}
                            />
                            <button
                                onClick={handleAddToCart}
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
                                        Thật khó chịu nếu như bạn mua một đôi
                                        giày hiệu về nhưng lại không vừa size
                                        hoặc chỉ đơn giản là thay đổi ý thích
                                        của bản thân và không được đổi trả…
                                        Chính vì vậy, ABCShoe cam kết đem đến
                                        cho khách hàng trải nghiệm mua sắm hàng
                                        hiệu hài lòng nhất: quý khách hàng có
                                        thể đổi/ trả lại sản phẩm mới mua trong
                                        vòng 7 ngày kể từ ngày nhận hàng.
                                    </p>
                                </div>
                            </details>
                            <details className='rounded-lg' open>
                                <summary className='text-[20px] text-slate-90 font-semibold select-none'>
                                    Giao hàng nhanh chóng
                                </summary>
                                <div className='mt-3 text-sm leading-6 text-slate-600'>
                                    <p>
                                        Giao hàng nhanh, chính xác và đúng hẹn
                                        cho các đơn hàng luôn là tiêu chí hàng
                                        đầu mà ABCShoe đặt ra. Khách hàng có thể
                                        an tâm khi đặt niềm tin ở ABCShoe, các
                                        sản phẩm quí khách lựa chọn sẽ luôn đến
                                        tay quý khách với trải nghiệm tuyệt vời
                                        nhất.
                                    </p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
                <div className='px-[150px] mt-[20px] flex flex-col space-y-4'>
                    <div className='flex justify-center items-center'>
                        <span className='text-[30px]'>Sản Phẩm Liên Quan</span>
                    </div>
                    {/* <ProductGridComponent></ProductGridComponent> */}
                </div>
            </div>
        </div>
    )
}

export default ProductName

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const { id } = context.query

    if (id) {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/get/product?id=${id}`,
        ).then((data) => data.json())

        return {
            props: {
                product: result.product,
            },
        }
    }

    return {
        props: {
            redirect: {
                destination: '/',
                permanent: true,
            },
        },
    }
}

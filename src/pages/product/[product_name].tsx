import React from 'react'
import Head from 'next/head'
import { ProductComponent, SizeComponent, SliderComponent } from '~/Components'
import PathComponent from '~/Components/Path/PathComponent'
import QuantityComponent from '~/Components/DetailPage/QuantityComponent'
import { formatVietnameseDong } from '~/utils/func'
import ProductGridComponent from '~/Components/Grid/ProductGridComponent'
import { GetStaticPaths, GetStaticProps } from 'next'

const ProductName = () => {
    const data = ['trang chu', 'giay', 'giay a']
    const settingSlider = {
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    }
    return (
        <div>
            <Head>
                <meta
                    property='og:title'
                    content={`Giày Adidas Superstar OG 'Vintage White' C77124`}
                />
                <meta
                    property='og:description'
                    content={`Mua Giày Adidas Superstar OG 'Vintage White' C77124 chính hãng 100% có sẵn tại Jordan 1. Giao hàng miễn phí trong 1 ngày. Cam kết đền tiền X5 nếu phát hiện Fake. Đổi trả miễn phí size. FREE vệ sinh giày trọn đời. MUA NGAY!`}
                />
                <meta
                    property='og:image'
                    content='https://product.hstatic.net/200000384421/product/_1_644x461_38-2-3-nowe-trampki-tenisowki-adidas-superstar-c77124-lobez_49c47cf40f554b77866cf43037e19b1e.jpg'
                />
                <meta property='og:url' content='URL trang web' />

                <meta name='twitter:card' content='summary_large_image' />
                <meta
                    name='twitter:title'
                    content={`Giày Adidas Superstar OG 'Vintage White' C77124`}
                />
                <meta
                    name='twitter:description'
                    content={`Mua Giày Adidas Superstar OG 'Vintage White' C77124 chính hãng 100% có sẵn tại Jordan 1. Giao hàng miễn phí trong 1 ngày. Cam kết đền tiền X5 nếu phát hiện Fake. Đổi trả miễn phí size. FREE vệ sinh giày trọn đời. MUA NGAY!`}
                />
                <meta
                    name='twitter:image'
                    content='https://product.hstatic.net/200000384421/product/_1_644x461_38-2-3-nowe-trampki-tenisowki-adidas-superstar-c77124-lobez_49c47cf40f554b77866cf43037e19b1e.jpg'
                />
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
                        <div className='outline-none overflow-hidden'>
                            <img
                                className='w-full h-full object-cover'
                                alt={`Giày Adidas Superstar OG 'Vintage White' C77124`}
                                src='https://product.hstatic.net/200000384421/product/_1_644x461_38-2-3-nowe-trampki-tenisowki-adidas-superstar-c77124-lobez_49c47cf40f554b77866cf43037e19b1e.jpg'
                            />
                        </div>
                        <div className='outline-none overflow-hidden'>
                            <img
                                alt={`Giày Adidas Superstar OG 'Vintage White' C77124`}
                                className='w-full h-full object-cover'
                                src='https://product.hstatic.net/200000384421/product/_1_644x461_38-2-3-nowe-trampki-tenisowki-adidas-superstar-c77124-lobez_49c47cf40f554b77866cf43037e19b1e.jpg'
                            />
                        </div>
                        <div className='outline-none overflow-hidden'>
                            <img
                                alt={`Giày Adidas Superstar OG 'Vintage White' C77124`}
                                className='w-full h-full object-cover'
                                src='https://product.hstatic.net/200000384421/product/_1_644x461_38-2-3-nowe-trampki-tenisowki-adidas-superstar-c77124-lobez_49c47cf40f554b77866cf43037e19b1e.jpg'
                            />
                        </div>
                        <div className='outline-none overflow-hidden'>
                            <img
                                alt={`Giày Adidas Superstar OG 'Vintage White' C77124`}
                                className='w-full h-full object-cover'
                                src='https://product.hstatic.net/200000384421/product/_1_644x461_38-2-3-nowe-trampki-tenisowki-adidas-superstar-c77124-lobez_49c47cf40f554b77866cf43037e19b1e.jpg'
                            />
                        </div>
                    </SliderComponent>
                    <div className='flex flex-col space-y-6'>
                        <div className='flex flex-col'>
                            <span className='font-medium text-[#000] text-[18px]'>
                                Giày Adidas Superstar OG 'Vintage White' C77124
                            </span>
                            <div className='flex items-center space-x-2 font-thin text-[14px]'>
                                <span>SKU:</span>
                                <span>C77124</span>
                            </div>
                            <span className='text-[#d5060a] text-[25px] font-medium'>
                                {formatVietnameseDong(2500000)}
                            </span>
                        </div>

                        <SizeComponent data={['36', '41 1/3']} />
                        <div>
                            <span className='font-bold text-[18px]'>
                                Liên hệ mua hàng:
                            </span>
                            <div>
                                <div className='flex items-center space-x-2'>
                                    <span>70-72 Tây Sơn, Đống Đa HN:</span>
                                    <span className='font-medium text-[blue]'>
                                        0964907954
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <QuantityComponent />
                            <button className='uppercase font-medium text-[15px] px-[25px] py-[10px] text-center bg-[#d5060a] text-[#fff] rounded-full'>
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                        <div className='flex flex-col space-y-4'>
                            <details className='rounded-lg' open>
                                <summary className='text-[20px] text-slate-90 font-semibold select-none'>
                                    Thông tin sản phẩm ?
                                </summary>
                                <div className='mt-3 text-sm leading-6 text-slate-600'>
                                    <p>
                                        Mua Giày Adidas Superstar OG 'Vintage
                                        White' C77124 chính hãng 100% có sẵn tại
                                        Jordan 1. Giao hàng miễn phí trong 1
                                        ngày. Cam kết đền tiền X5 nếu phát hiện
                                        Fake. Đổi trả miễn phí size. FREE vệ
                                        sinh giày trọn đời. MUA NGAY!
                                    </p>
                                </div>
                            </details>
                            <details className='rounded-lg' open>
                                <summary className='text-[20px] text-slate-90 font-semibold select-none'>
                                    Đổi trả miễn phí ?
                                </summary>
                                <div className='mt-3 text-sm leading-6 text-slate-600'>
                                    <p></p>
                                </div>
                            </details>
                            <details className='rounded-lg' open>
                                <summary className='text-[20px] text-slate-90 font-semibold select-none'>
                                    Giao hàng nhanh chóng
                                </summary>
                                <div className='mt-3 text-sm leading-6 text-slate-600'>
                                    <p></p>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
                <div className='px-[150px] mt-[20px] flex flex-col space-y-4'>
                    <div className='flex justify-center items-center'>
                        <span className='text-[30px]'>Sản Phẩm Liên Quan</span>
                    </div>
                    <ProductGridComponent>
                        <ProductComponent />
                        <ProductComponent />
                        <ProductComponent />
                        <ProductComponent />
                        <ProductComponent />
                        <ProductComponent />
                        <ProductComponent />
                    </ProductGridComponent>
                </div>
            </div>
        </div>
    )
}

export default ProductName

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps = async () => {
    return { props: {} }
}

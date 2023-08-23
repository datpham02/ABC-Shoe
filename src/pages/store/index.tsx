import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'

import { LoadingComponent } from '~/Components'
import StoreLayout from '~/layout/StoreLayout'
import { authOptions } from '../api/auth/[...nextauth]'
import axios from 'axios'
import { formatVietnameseDong } from '~/utils/func'
import { getServerSession } from 'next-auth'
import { useQuery } from '@tanstack/react-query'

const Index = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { data: statistics_product } = useQuery({
        queryKey: ['product_statistics'],
        queryFn: async () => {
            const { data } = await axios.get('/api/get/statistics/product')

            return data.statistics_product
        },
    })
    const { data: statistics_order } = useQuery({
        queryKey: ['order_statistics'],
        queryFn: async () => {
            const { data } = await axios.get('/api/get/statistics/order')

            return data
        },
        onSuccess: (data) => console.log(data),
    })
    const { data: statistics_customer } = useQuery({
        queryKey: ['customer_statistics'],
        queryFn: async () => {
            const { data } = await axios.get('/api/get/statistics/customer')

            return data.statistics_customer
        },
        onSuccess: (data) => console.log(data),
    })

    useEffect(() => {
        if (statistics_customer && statistics_order && statistics_product)
            setIsLoading(false)
    }, [statistics_customer, statistics_order, statistics_product])
    return (
        <StoreLayout>
            {isLoading ? (
                <LoadingComponent />
            ) : (
                <div className='h-screen flex flex-col space-y-2 py-[15px] px-[30px]'>
                    <div className='grid grid-cols-3 gap-4 '>
                        <div className='w-full h-[200px]'>
                            <div className='h-full w-full flex items-center p-4 rounded-lg bg-white border-l-4 border-purple-400'>
                                <div className='flex items-center'>
                                    <div className='icon w-14 p-3.5 bg-purple-400 text-white rounded-full mr-3'>
                                        <svg
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                                            ></path>
                                        </svg>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <div className='text-lg'>
                                            {statistics_product?.product_sold ??
                                                0}
                                        </div>
                                        <div className='text-sm text-gray-400'>
                                            Sản phẩm bán được
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full h-[200px]'>
                            <div className='h-full w-full flex items-center p-4 rounded-lg bg-white border-l-4 border-blue-400'>
                                <div className='flex items-center'>
                                    <div className='icon w-14 p-3.5 bg-blue-400 text-white rounded-full mr-3'>
                                        <svg
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                                            />
                                        </svg>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <div className='text-lg'>
                                            {statistics_customer?.quantity_customer ??
                                                0}
                                        </div>
                                        <div className='text-sm text-gray-400'>
                                            Số lượng khách hàng
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full h-[200px]'>
                            <div className='h-full w-full flex items-center p-4 rounded-lg bg-white border-l-4 border-yellow-400'>
                                <div className='flex items-center'>
                                    <div className='icon w-14 p-3.5 bg-yellow-400 text-white rounded-full mr-3'>
                                        <svg
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
                                            />
                                        </svg>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <div className='text-lg'>
                                            {statistics_product?.quantity_product ??
                                                0}
                                        </div>
                                        <div className='text-sm text-gray-400'>
                                            Số lượng sản phẩm
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full h-[200px]'>
                            <div className='h-full w-full flex items-center p-4 rounded-lg bg-white border-l-4 border-red-400'>
                                <div className='flex items-center'>
                                    <div className='icon w-14 p-3.5 bg-red-400 text-white rounded-full mr-3'>
                                        <svg
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                                            />
                                        </svg>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <div className='text-lg'>
                                            {statistics_order?.statistics_order
                                                ?.quantity_order ?? 0}
                                        </div>
                                        <div className='text-sm text-gray-400'>
                                            Số lượng đơn hàng
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full h-[200px]'>
                            <div className='h-full w-full flex items-center p-4 rounded-lg bg-white border-l-4 border-green-400'>
                                <div className='flex items-center'>
                                    <div className='icon w-14 p-3.5 bg-green-400 text-white rounded-full mr-3'>
                                        <svg
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth='2'
                                                d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                            />
                                        </svg>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <div className='text-lg'>
                                            {formatVietnameseDong(
                                                statistics_order?.revenue,
                                            ) ?? 0}
                                        </div>
                                        <div className='text-sm text-gray-400'>
                                            Doanh thu
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </StoreLayout>
    )
}

export default Index
export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions,
    )

    if (session?.user.role != 'admin') {
        return {
            redirect: {
                destination: '/',
                permanent: true,
            },
        }
    }
    return {
        props: {},
    }
}

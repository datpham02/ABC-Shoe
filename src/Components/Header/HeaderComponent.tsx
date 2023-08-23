import { CiSearch, CiSettings, CiShoppingCart, CiUser } from 'react-icons/ci'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { GrClose } from 'react-icons/gr'
import HeaderItemComponent from './HeaderItemComponent'
import { IoIosLogOut } from 'react-icons/io'
import Link from 'next/link'
import Tippy from '@tippyjs/react/headless'
import axios from 'axios'
import { formatVietnameseDong } from '~/utils/func'
import useDebounce from '~/utils/hook/useDebounce'

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
    slug: string
    id: string
    product: Product[]
}
const HeaderComponent = () => {
    const { data: sessionData } = useSession()
    const [searchData, setSearchData] = useState<string>('')
    const searchDataDebounce = useDebounce(searchData, 500)
    const { data: category } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const { data } = await axios.get('/api/get/category?all=true')
            return data.categorys
        },
    })
    const searchRef = useRef<HTMLDivElement>(null)
    const { data: search_product_data, mutate: search_product } = useMutation({
        mutationKey: ['search_product'],
        mutationFn: async (search_data: string) => {
            const { data } = await axios.get(
                `/api/search/product?product_name=${search_data}`,
            )
            return data
        },
        onSuccess: (data) => console.log(data),
    })
    const handleShowSearh = () => {
        if (searchRef.current && searchRef) {
            searchRef.current.classList.remove('translate-y-[-100%]')
            searchRef.current.classList.add('translate-y-[0]')
        }
    }
    const handleHideSearh = () => {
        if (searchRef.current && searchRef) {
            searchRef.current.classList.remove('translate-y-[0]')
            searchRef.current.classList.add('translate-y-[-100%]')
            setSearchData('')
        }
    }
    const handleSearchOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchData(e.target.value)
    }

    useEffect(() => {
        if (searchDataDebounce) {
            search_product(searchDataDebounce)
        }
    }, [searchDataDebounce])

    return (
        <div className='fixed top-0 z-[2] w-full bg-[#fff] shadow-md h-[80px] flex items-center px-[100px]'>
            <div className='w-[20%] flex justify-center'>
                <Link href={'/'}>
                    <span className='text-[30px] cursor-pointer'>ABC Shoe</span>
                </Link>
            </div>
            <div className='w-[80%] flex justify-between space-x-4'>
                <div className='flex space-x-4'>
                    <HeaderItemComponent
                        name={'trang chủ'}
                        href={'/'}
                        item={[]}
                    />
                    <HeaderItemComponent
                        name={'sneakers'}
                        href={null}
                        item={category?.map((category: Category) => {
                            return {
                                name: category.name,
                                href: `/category/${category.slug}`,
                                item: [],
                            }
                        })}
                    />
                    <HeaderItemComponent
                        name={'tất cả sản phẩm'}
                        href={'/category/all'}
                        item={[]}
                    />
                </div>
                <div className='flex items-center space-x-2 text-[30px]'>
                    {sessionData?.user ? (
                        <>
                            {sessionData.user.role == 'admin' ? (
                                <Link href={'/store'}>
                                    <CiSettings className='hover:text-[#D31F28]' />
                                </Link>
                            ) : (
                                <IoIosLogOut
                                    className='hover:text-[#D31F28]'
                                    onClick={() => {
                                        signOut()
                                    }}
                                />
                            )}
                        </>
                    ) : (
                        <Link href='/login'>
                            <CiUser className='hover:text-[#D31F28]' />
                        </Link>
                    )}
                    {sessionData?.user.role == 'admin' ? (
                        <IoIosLogOut
                            className='hover:text-[#D31F28]'
                            onClick={() => {
                                signOut()
                            }}
                        />
                    ) : (
                        <>
                            <CiSearch
                                onClick={() => {
                                    handleShowSearh()
                                }}
                                className='hover:text-[#D31F28]'
                            />
                            <Link href='/cart'>
                                <CiShoppingCart className='hover:text-[#D31F28]' />
                            </Link>
                        </>
                    )}
                </div>
            </div>

            <div
                ref={searchRef}
                className='absolute w-full h-full px-[200px] bg-[#fff] flex flex-col items-center transition-all duration-200 ease-in-out translate-y-[-100%]'
            >
                <Tippy
                    interactive
                    visible={searchData ? true : false}
                    offset={[0, 81]}
                    render={(attrs) => (
                        <div
                            {...attrs}
                            className='w-[1250px] flex items-center'
                        >
                            <div className='w-full flex flex-col px-[15px] py-[15px] space-y-2 bg-[#fff]'>
                                {search_product_data ? (
                                    search_product_data?.products.map(
                                        (product: Product) => (
                                            <div
                                                key={product.id}
                                                className='w-full flex items-center space-x-2 bg-[#fff] hover:shadow-md hover:border-[1px]'
                                            >
                                                <div className='w-[150px] h-[80px]'>
                                                    <img
                                                        className='w-full h-full object-cover bg-transparent'
                                                        src={product.image[0]}
                                                    />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <span className='text-[18px]'>
                                                        {product.name}
                                                    </span>
                                                    <span className='text-[#D31f28]'>
                                                        {formatVietnameseDong(
                                                            product.price,
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                        ),
                                    )
                                ) : (
                                    <div className='w-full h-[80px] flex justify-center items-center bg-[#fff]'>
                                        <span>{`Không tìm thấy "${searchDataDebounce}"`}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                >
                    <div className='w-full'></div>
                </Tippy>

                <div className='w-full h-full flex items-center'>
                    <CiSearch className='hover:text-[#D31F28] text-[30px]' />

                    <input
                        placeholder='Tìm kiếm sản phẩm'
                        onChange={handleSearchOnchange}
                        value={searchData}
                        className='outline-none w-full h-full  px-[8px] py-[10px]'
                    />

                    <GrClose
                        onClick={() => {
                            handleHideSearh()
                        }}
                        className='text-[20px] cursor-pointer'
                    />
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent

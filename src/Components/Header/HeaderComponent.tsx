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
import {
    Drawer,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from '@material-tailwind/react'
import { AiOutlineMenu } from 'react-icons/ai'
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
    const [open, setOpen] = useState(false)

    const { data: category, isSuccess: category_get_success } = useQuery({
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
    const openDrawer = () => setOpen(true)
    const closeDrawer = () => setOpen(false)
    useEffect(() => {
        if (searchDataDebounce) {
            search_product(searchDataDebounce)
        }
    }, [searchDataDebounce])

    return (
        <div className='fixed top-0 z-[2] w-full bg-[#fff] shadow-md h-[80px] flex items-center px-[100px]'>
            <div className='lg:w-[20%] flex lg:justify-center w-full justify-between items-center'>
                <Link href={'/'}>
                    <span className='text-[30px] cursor-pointer'>ABC Shoe</span>
                </Link>
                <AiOutlineMenu
                    onClick={openDrawer}
                    className='lg:hidden w-[30px] h-[30px] cursor-pointer'
                />
            </div>
            <div className='lg:w-[80%] hidden justify-between space-x-4 lg:flex'>
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
            <Drawer open={open} onClose={closeDrawer} className='p-4'>
                <div className='flex flex-col'>
                    <Link
                        href={'/'}
                        className='px-4 py-2 hover:bg-gray-100 hover:text-gray-700 w-full'
                    >
                        <span>Trang chủ</span>
                    </Link>
                    <details className='group [&_summary::-webkit-details-marker]:hidden'>
                        <summary className='flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-gray-100 hover:text-gray-700'>
                            <span>Sneakers</span>

                            <span className='shrink-0 transition duration-300 group-open:-rotate-180'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-5 w-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fill-rule='evenodd'
                                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                                        clip-rule='evenodd'
                                    />
                                </svg>
                            </span>
                        </summary>

                        <div className='mt-2 space-y-1 px-4 w-full flex flex-col'>
                            {category_get_success
                                ? category?.map((category: Category) => (
                                      <Link
                                          key={category.id}
                                          href={`/category/${category.slug}`}
                                          className='px-4 py-2 hover:bg-gray-100 hover:text-gray-700'
                                      >
                                          <span>{category.name}</span>
                                      </Link>
                                  ))
                                : null}
                            <Link
                                href={`/login`}
                                className='px-4 py-2 hover:bg-gray-100 hover:text-gray-700'
                            >
                                <span>Đăng nhập</span>
                            </Link>
                        </div>
                    </details>
                    <Link
                        href={'/category/all'}
                        className='px-4 py-2 hover:bg-gray-100 hover:text-gray-700 w-full'
                    >
                        <span>Tất cả sản phẩm</span>
                    </Link>
                </div>
            </Drawer>
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

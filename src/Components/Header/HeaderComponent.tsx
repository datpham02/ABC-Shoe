import React, { useEffect, useRef, useState } from 'react'
import { signOut } from 'next-auth/react'
import { CiShoppingCart, CiSearch, CiUser } from 'react-icons/ci'
import Link from 'next/link'
import { GrClose } from 'react-icons/gr'
import { CiSettings } from 'react-icons/ci'
import { useSession } from 'next-auth/react'
import { IoIosLogOut } from 'react-icons/io'
import { HeaderItem } from '~/utils/interface'
import HeaderItemComponent from './HeaderItemComponent'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const HeaderComponent = () => {
    const { data: sessionData } = useSession()
    const { data: category } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const { data } = await axios.get('/api/get/category?all=true')
            return data.categorys
        },
        staleTime: 60 * 1000,
    })
    const searchRef = useRef<HTMLDivElement>(null)

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
        }
    }

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
                        item={category?.map(
                            (category: { id: string; name: string }) => {
                                return {
                                    name: category.name,
                                    href: `/category/${category.id}`,
                                    item: [],
                                }
                            },
                        )}
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
                className='absolute w-full h-full px-[200px] bg-[#fff] flex items-center transition-all duration-200 ease-in-out translate-y-[-100%]'
            >
                <div className='w-full h-full flex items-center'>
                    <CiSearch className='hover:text-[#D31F28] text-[30px]' />
                    <input
                        placeholder='Tìm kiếm sản phẩm'
                        type='search'
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

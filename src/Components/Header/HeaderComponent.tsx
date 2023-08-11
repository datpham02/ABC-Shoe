import React, { useEffect, useRef, useState } from 'react'
import { CiShoppingCart, CiSearch, CiUser } from 'react-icons/ci'
import { HeaderItem } from '~/utils/interface'
import HeaderItemComponent from './HeaderItemComponent'
import Link from 'next/link'
import { GrClose } from 'react-icons/gr'

const HeaderItemData = [
    {
        name: 'trang chủ',
        href: '/',
        item: [],
    },
    {
        name: 'sneakers',
        href: null,
        item: ['Giày Air Jordan'],
    },
    {
        name: 'giày chuyên dụng',
        href: null,
        item: [],
    },
    {
        name: 'phụ kiện',
        href: null,
        item: [],
    },
]
const HeaderComponent = () => {
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
                    {HeaderItemData.map((item: HeaderItem, index: number) => {
                        return (
                            <HeaderItemComponent
                                key={item.name + index}
                                name={item.name}
                                href={item.href}
                                item={item.item}
                            />
                        )
                    })}
                </div>
                <div className='flex items-center space-x-2 text-[30px]'>
                    <Link href='/login'>
                        <CiUser className='hover:text-[#D31F28]' />
                    </Link>
                    <CiSearch
                        onClick={() => {
                            handleShowSearh()
                        }}
                        className='hover:text-[#D31F28]'
                    />
                    <Link href='/cart'>
                        <CiShoppingCart className='hover:text-[#D31F28]' />
                    </Link>
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

import React from 'react'
import { CiShoppingCart, CiSearch, CiUser } from 'react-icons/ci'
import { HeaderItem } from '~/utils/interface'
import HeaderItemComponent from './HeaderItemComponent'
import Link from 'next/link'
const HeaderItemData = [
    {
        name: 'trang chủ',
        item: [],
    },
    {
        name: 'sneakers',
        item: ['Giày Air Jordan'],
    },
    {
        name: 'giày chuyên dụng',
        item: [],
    },
    {
        name: 'phụ kiện',
        item: [],
    },
]
const HeaderComponent = () => {
    return (
        <div className='sticky shadow-md h-[80px] flex items-center px-[100px]'>
            <div className='w-[20%] flex justify-center'>
                <span className='text-[30px] cursor-pointer'>ABC Shoe</span>
            </div>
            <div className='w-[80%] flex justify-between space-x-4'>
                <div className='flex space-x-4'>
                    {HeaderItemData.map((item: HeaderItem, index: number) => {
                        return (
                            <HeaderItemComponent
                                key={item.name + index}
                                name={item.name}
                                item={item.item}
                            />
                        )
                    })}
                </div>
                <div className='flex items-center space-x-2 text-[30px]'>
                    <Link href='/login'>
                        <CiUser className='hover:text-[#D31F28]' />
                    </Link>
                    <CiSearch className='hover:text-[#D31F28]' />
                    <Link href='/cart'>
                        <CiShoppingCart className='hover:text-[#D31F28]' />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HeaderComponent

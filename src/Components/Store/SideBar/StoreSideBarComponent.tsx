import React from 'react'
import { AiFillTag, AiOutlineShopping } from 'react-icons/ai'
import { BiHome, BiSolidUser } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'
import { StoreSideBarComponent as StoreSideBarComponentType } from '~/utils/interface'

const StoreSideBarComponent = ({ className }: StoreSideBarComponentType) => {
    return (
        <div
            className={twMerge(
                'flex flex-col bg-[#EBEBEB] p-[10px]',
                className,
            )}
        >
            <div className='cursor-pointer flex items-center space-x-4 px-[10px] py-[5px] bg-[#fff] rounded-md'>
                <BiHome className='leading-[32px] w-[20px] h-[20px]' />
                <span className='font-medium text-[14px]'>Trang chủ</span>
            </div>
            <div className='cursor-pointer flex items-center space-x-4 px-[10px] py-[5px] rounded-md'>
                <AiOutlineShopping className='leading-[32px] w-[20px] h-[20px]' />
                <span className='font-medium text-[14px]'>Đơn hàng</span>
            </div>
            <div className='cursor-pointer flex items-center space-x-4 px-[10px] py-[5px] rounded-md'>
                <AiFillTag className='leading-[32px] w-[20px] h-[20px]' />
                <span className='font-medium text-[14px]'>Sản phẩm</span>
            </div>
            <div className='cursor-pointer flex items-center space-x-4 px-[10px] py-[5px] rounded-md'>
                <BiSolidUser className='leading-[32px] w-[20px] h-[20px]' />
                <span className='font-medium text-[14px]'>Khách hàng</span>
            </div>
        </div>
    )
}

export default StoreSideBarComponent

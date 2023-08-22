import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillTag, AiOutlineShopping } from 'react-icons/ai'
import { BiHome, BiSolidUser } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'
import { StoreSideBarComponent as StoreSideBarComponentType } from '~/utils/interface'

const StoreSideBarComponent = ({ className }: StoreSideBarComponentType) => {
    const router = useRouter()

    return (
        <div
            className={twMerge(
                'flex flex-col bg-[#EBEBEB] p-[10px]',
                className,
            )}
        >
            {router?.pathname == '/store' ? (
                <div className='cursor-pointer flex items-center space-x-4 px-[10px] py-[5px] bg-[#fff] rounded-md'>
                    <BiHome className='leading-[32px] w-[20px] h-[20px]' />
                    <span className='font-medium text-[14px]'>Trang chủ</span>
                </div>
            ) : (
                <Link href='/store'>
                    <div className='cursor-pointer flex items-center space-x-4 px-[10px] py-[5px] rounded-md'>
                        <BiHome className='leading-[32px] w-[20px] h-[20px]' />
                        <span className='font-medium text-[14px]'>
                            Trang chủ
                        </span>
                    </div>
                </Link>
            )}
            {router?.pathname == '/store/order/[type]' ? (
                <div className='cursor-pointer flex items-center space-x-4 px-[10px] bg-[#fff] py-[5px] rounded-md'>
                    <AiOutlineShopping className='leading-[32px] w-[20px] h-[20px]' />
                    <span className='font-medium text-[14px]'>Đơn hàng</span>
                </div>
            ) : (
                <Link href={'/store/order/tat-ca'}>
                    <div className='cursor-pointer flex items-center space-x-4 px-[10px] py-[5px] rounded-md'>
                        <AiOutlineShopping className='leading-[32px] w-[20px] h-[20px]' />
                        <span className='font-medium text-[14px]'>
                            Đơn hàng
                        </span>
                    </div>
                </Link>
            )}
            {router?.pathname == '/store/product' ? (
                <div className='cursor-pointer flex items-center space-x-4 px-[10px] py-[5px] bg-[#fff] rounded-md'>
                    <AiFillTag className='leading-[32px] w-[20px] h-[20px]' />
                    <span className='font-medium text-[14px]'>Sản phẩm</span>
                </div>
            ) : (
                <Link href={'/store/product'}>
                    <div className='cursor-pointer flex items-center space-x-4 px-[10px] py-[5px] rounded-md'>
                        <AiFillTag className='leading-[32px] w-[20px] h-[20px]' />
                        <span className='font-medium text-[14px]'>
                            Sản phẩm
                        </span>
                    </div>
                </Link>
            )}
            {router.pathname == '/store/customer' ? (
                <div className='cursor-pointer flex items-center space-x-4 px-[10px] py-[5px] bg-[#fff] rounded-md'>
                    <BiSolidUser className='leading-[32px] w-[20px] h-[20px]' />
                    <span className='font-medium text-[14px]'>Khách hàng</span>
                </div>
            ) : (
                <Link href={'/store/customer'}>
                    <div className='cursor-pointer flex items-center space-x-4 px-[10px] py-[5px] rounded-md'>
                        <BiSolidUser className='leading-[32px] w-[20px] h-[20px]' />
                        <span className='font-medium text-[14px]'>
                            Khách hàng
                        </span>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default StoreSideBarComponent

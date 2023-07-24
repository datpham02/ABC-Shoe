import React, { useEffect, useState } from 'react'
import { ImLocation } from 'react-icons/im'
import { AddressComponent, PathComponent } from '~/Components'
import { formatVietnameseDong } from '~/utils/func'
const step1 = [
    {
        name: 'trang chủ',
        href: '/',
    },
    {
        name: 'Thông tin giao hàng',
        href: '/checkout?step=1',
    },
]
const step2 = [
    {
        name: 'trang chủ',
        href: '/',
    },
    {
        name: 'Thông tin giao hàng',
        href: '/checkout?step=1',
    },
    {
        name: 'Phương thức thanh toán',
        href: '/checkout?step=2',
    },
]
const CheckOut = () => {
    const [addressSettingShow, setAddressSettingShow] = useState<Boolean>(false)
    const handleAddressSettingShow = () => {
        if (addressSettingShow) {
            if (document) {
                document.body.style.overflowY = 'auto'
            }
            setAddressSettingShow(false)
        } else {
            if (document) {
                document.body.style.overflowY = 'hidden'
            }
            setAddressSettingShow(true)
        }
    }

    return (
        <div
            style={{ overflowY: 'auto' }}
            className='w-full relative flex flex-col bg-[#F5F5F5]'
        >
            <PathComponent data={step1} className='px-[150px] bg-[#fff]' />
            <div className='px-[150px] mt-[20px]'>
                <div className='flex flex-col bg-[#fff] shadow-md p-[20px]'>
                    <div className='flex items-center gap-2'>
                        <ImLocation className='text-[#ee4d2d] w-[20px] h-[20px]' />
                        <span className='text-[#ee4d2d] text-[20px]'>
                            Địa Chỉ Nhận Hàng
                        </span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='flex items-center gap-2'>
                            <span className='font-bold text-[18px]'>
                                Phạm Trọng Đạt
                            </span>
                            <span className='flex items-center gap-2 font-bold text-[18px] '>
                                (+84)
                                <span className='font-bold text-[18px]'>
                                    798161321
                                </span>
                            </span>
                        </div>
                        <div className='flex items-center gap-4'>
                            <span className='line-clamp-2 text-[18px]'>
                                138a Quốc Lộ 1a, Phường Bình Hưng Hòa B, Quận
                                Bình Tân, TP. Hồ Chí Minh
                            </span>
                            <span
                                onClick={() => {
                                    handleAddressSettingShow()
                                }}
                                className='text-[#4080ee] cursor-pointer'
                            >
                                Thay Đổi
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex bg-[#fff] py-[15px] shadow-sm shadow-[rgba(0,0,0,.05)]'>
                        <div className='w-[50%] rounded-sm flex justify-start items-center pl-[25px] text-[rgba(0,0,0,.54)]'>
                            Sản Phẩm
                        </div>
                        <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                            Đơn Giá
                        </div>
                        <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                            Số Lượng
                        </div>
                        <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                            Số Tiền
                        </div>
                    </div>
                    <div className='bg-[#fff] shadow-sm shadow-[rgba(0,0,0,.05)]'>
                        <div className='flex bg-[#fff] py-[20px]'>
                            <div className='w-[50%] rounded-sm flex justify-start items-center pl-[25px] gap-3'>
                                <img
                                    className='w-[80px] object-cover'
                                    src='https://product.hstatic.net/200000384421/product/8609_01.jpg_730e52ab95f04401a870e9ac2aa8aad8_670a497801244d37b6886ed10dccd43d_medium.jpeg'
                                />
                                <div className='flex items-center gap-3'>
                                    <span className='line-clamp-2 w-[50%]'>
                                        Giày Adidas Superstar OG 'Vintage White'
                                        C77124
                                    </span>
                                    <div className='w-[50%] flex flex-col gap-1 justify-center items-center'>
                                        <div className='w-full flex items-center justify-start text-[rgba(0,0,0,.54)]'>
                                            <div className='relative flex items-center gap-2'>
                                                <span className='cursor-pointer text-[rgba(0,0,0,.54)]'>
                                                    Phân Loại Hàng
                                                </span>
                                            </div>
                                        </div>
                                        <div className='w-full flex items-center space-x-2 '>
                                            <span className='text-[rgba(0,0,0,.54)]'>
                                                Size:
                                            </span>
                                            <span className='text-[rgba(0,0,0,.54)]'>
                                                33
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                <div className='flex items-center'>
                                    <div className='flex gap-2 items-center rounded-md px-[10px] py-[5px]'>
                                        <span>
                                            {formatVietnameseDong(5000000)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                1
                            </div>
                            <div className='w-[12.5%] rounded-sm flex justify-center items-center text-[rgba(0,0,0,.54)]'>
                                <span>{formatVietnameseDong(5000000)}</span>
                            </div>
                        </div>
                    </div>
                    <div className='bg-[#fff] sticky flex flex-col items-end gap-4 py-[25px] px-[20px] shadow-sm shadow-[rgba(0,0,0,.05)]'>
                        <div className='w-full flex justify-start items-center gap-3'>
                            <span className='flex font-medium text-[20px]'>
                                Phương thức thanh toán
                            </span>
                            <span className='flex items-center justify-center px-[15px] py-[4px] rounded-sm '>
                                Thanh toán khi nhân hàng
                            </span>
                        </div>
                        <hr className='my-[15px] w-full' />
                        <div className='flex flex-col items-end'>
                            <div className='flex justify-between w-full gap-5 text-[rgba(0,0,0,.54)]'>
                                <span>Tổng tiền hàng</span>
                                <span>{formatVietnameseDong(5000000)}</span>
                            </div>
                            <div className='flex justify-between w-full gap-5 text-[rgba(0,0,0,.54)]'>
                                <span>Phí vận chuuyển</span>
                                <span>{formatVietnameseDong(5000000)}</span>
                            </div>
                            <div className='flex justify-between w-full gap-5'>
                                <span className='flex items-center gap-1 text-[rgba(0,0,0,.54)]'>
                                    Tổng thanh toán
                                    <span className='text-[rgba(0,0,0,.54)]'>
                                        (1 Sản Phẩm):
                                    </span>
                                </span>
                                <span className='text-[24px] text-[#ee4d2d] leading-[28px]'>
                                    <span>{formatVietnameseDong(5000000)}</span>
                                </span>
                            </div>
                        </div>
                        <hr className='my-[15px] w-full border-dashed' />
                        <div className='flex items-center'>
                            <button className='bg-[#ee4d2d] text-[#fff] rounded-sm px-[70px] py-[8px]'>
                                Đặt Hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {addressSettingShow ? (
                <div className='fixed z-[3] inset-0 bg-[rgba(0,0,0,.4)] flex justify-center'>
                    <AddressComponent
                        className='w-[600px] mt-[150px]'
                        handlShowAddressSetting={handleAddressSettingShow}
                    />
                </div>
            ) : null}
        </div>
    )
}

export default CheckOut

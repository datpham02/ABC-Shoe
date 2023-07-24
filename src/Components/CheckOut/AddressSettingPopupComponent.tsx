import React, { useState } from 'react'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'
import { AddressComponent as AddressComponentType } from '~/utils/interface'
import RadioComponent from '../Radio/RadioComponent'

const AddressSettingPopupComponent = ({
    className,
    handlShowAddressSetting,
}: AddressComponentType) => {
    const [check, setCheck] = useState<Boolean>(false)
    const handleChecked = () => {
        setCheck(!check)
    }
    return (
        <div className={twMerge('flex flex-col', className)}>
            <div className='flex flex-col bg-[#fff] py-[15px] px-[25px] w-full'>
                <div className='flex justify-between'>
                    <span className='font-medium text-[20px]'>
                        Địa chỉ của tôi
                    </span>
                    <button className='flex gap-2 bg-[#ee4d2d] items-center px-[15px] py-[10px] rounded-sm'>
                        <AiOutlinePlus className='text-[#fff] w-[22px] h-[22px]' />
                        <span className='text-[#fff]'>Thêm địa chỉ mới</span>
                    </button>
                </div>
                <hr className='my-[15px]' />
                <div className='flex flex-col'>
                    <div
                        onClick={() => {
                            handleChecked()
                        }}
                        className='flex flex-col space-y-3 cursor-pointer'
                    >
                        <div className='flex items-center space-x-2'>
                            <div className='h-full flex items-start'>
                                <RadioComponent checked={check} />
                            </div>
                            <div className='h-full flex justify-between items-center space-x-2'>
                                <div className='flex flex-col space-y-1 flex-1'>
                                    <div className='flex gap-2'>
                                        <span className='font-normal text-[black]'>
                                            Phạm Trọng Đạt
                                        </span>
                                        <span className='border-solid border-l border-[rgba(0,0,0,.26)] pl-[5px] text-[rgba(0,0,0,.54)]'>
                                            (+84) 798161321
                                        </span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <div className='text-[rgba(0,0,0,.54)]'>
                                            138a Quốc Lộ 1a
                                        </div>
                                        <div className='text-[rgba(0,0,0,.54)]'>
                                            Phường Bình Hưng Hòa B, Quận Bình
                                            Tân, TP. Hồ Chí Minh
                                        </div>
                                    </div>
                                    <div className='flex justify-start'>
                                        <div className='flex justify-center items-center border-solid border-[1px] border-[#ee4d2d] text-[#ee4d2d] px-[3px] text-[14px] font-medium'>
                                            Mặc định
                                        </div>
                                    </div>
                                </div>
                                <div className='h-full flex items-start'>
                                    <div className='flex items-center space-x-2 mt-[15px]'>
                                        <span className='text-[#08f] cursor-pointer'>
                                            Cập nhập
                                        </span>
                                        <span className='text-[#08f] cursor-pointer'>
                                            Xóa
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='my-[15px]' />
                    </div>
                </div>
                <div className='flex items-center space-x-10 mt-[15px]'>
                    <button
                        onClick={() => {
                            handlShowAddressSetting()
                        }}
                        className=' border-solid border-[1px] border-[#E8E8E8] items-center w-[50%] px-[15px] py-[10px] rounded-sm'
                    >
                        Hủy
                    </button>
                    <button className='bg-[#ee4d2d] items-center w-[50%] px-[15px] py-[10px] rounded-sm text-[#fff]'>
                        Xác nhận
                    </button>
                </div>
            </div>
            <div className='addressForm hidden fixed inset-0 w-full h-full bg-[rgba(0,0,0,.4)] justify-center items-center transition-all duration-200 ease-in-out'>
                <div className='bg-[#fff] rounded-sm flex flex-col gap-4 p-[25px]'>
                    <span className='font-medium text-[20px]'>
                        Cập nhập địa chỉ
                    </span>
                    <form className='w-full h-full flex flex-col gap-6'>
                        <div className='flex gap-4'>
                            <div className='relative flex'>
                                <label className='absolute text-[12px] top-[-10px] left-[14px] bg-[#fff] text-[rgba(0,0,0,.4)]  px-[3px]'>
                                    Họ và tên
                                </label>
                                <input className='outline-none border-solid border-[1px] border-[#dbdbdb] bg-transparent rounded-sm p-[10px] h-[38px]' />
                            </div>
                            <div className='relative flex'>
                                <label className='absolute text-[12px] top-[-10px] left-[14px] bg-[#fff] text-[rgba(0,0,0,.4)]  px-[3px]'>
                                    Số điện thoại
                                </label>
                                <input className='outline-none border-solid border-[1px] border-[#dbdbdb] bg-transparent rounded-sm p-[10px] h-[38px]' />
                            </div>
                        </div>
                        <div className='relative flex'>
                            <label className='absolute z-50 text-[12px] top-[-10px] left-[14px] bg-[#fff] text-[rgba(0,0,0,.4)]  px-[3px]'>
                                Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã
                            </label>
                            <div className='relative w-full flex items-center '>
                                <input
                                    placeholder='Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã'
                                    className='location outline-none placeholder:text-[16px] placeholder:font-[450] placeholder:text-[#dbdbdb] border-solid border-[1px] border-[#dbdbdb] bg-transparent rounded-sm p-[10px] h-[38px] w-full'
                                />
                                <input
                                    placeholder={
                                        'Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã'
                                    }
                                    className='locationSearch hidden outline-none placeholder:text-[16px] placeholder:font-[450] placeholder:text-[#dbdbdb] border-solid border-[1px] border-[#dbdbdb] bg-transparent rounded-sm p-[10px] h-[38px] w-full'
                                />
                                <span className='absolute hidden right-[15px] items-center justify-center'>
                                    <AiOutlineSearch className='w-[22px] h-[22px] text-[#dbdbdb]' />
                                </span>
                            </div>

                            <div
                                id='tabContentWraper'
                                className='z-50 top-[45px] hidden absolute bg-[#fff] shadow-sm shadow-[#bdbdbd] overflow-hidden w-full'
                            >
                                <div className='locationTabs flex items-center justify-between'>
                                    <input
                                        type={'button'}
                                        defaultValue={'Tỉnh/Thành phố'}
                                        className='locationTab w-full h-full py-[15px]  border-y-[1px] transition-all duration-200 cursor-pointer flex justify-center items-center'
                                    />

                                    <input
                                        type={'button'}
                                        defaultValue={'Quận/Huyện'}
                                        className='locationTab w-full h-full py-[15px] border-y-[1px]  transition-all duration-200 cursor-pointer disabled:hover:cursor-not-allowed flex justify-center items-center'
                                    />

                                    <input
                                        type={'button'}
                                        defaultValue={'Phường/Xã'}
                                        className='locationTab w-full h-full py-[15px] border-y-[1px]  transition-all duration-200 cursor-pointer disabled:hover:cursor-not-allowed flex justify-center items-center'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='relative flex'>
                            <label className='absolute text-[12px] top-[-10px] left-[14px] bg-[#fff] text-[rgba(0,0,0,.4)]  px-[3px]'>
                                Địa chỉ cụ thể
                            </label>
                            <textarea
                                rows={2}
                                style={{
                                    resize: 'none',
                                }}
                                className='outline-none border-solid border-[1px] border-[#dbdbdb] bg-transparent rounded-sm p-[10px] w-full'
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <input
                                id='default_address'
                                className='border-[#dbdbdb] rounded-sm outline-none focus:shadow-none focus:ring-transparent checked:bg-[#ee4d2d] checked:hover:bg-[#ee4d2d]   focus:checked:bg-[#ee4d2d]  '
                                type={'checkbox'}
                            />
                            <label htmlFor='default_address'>
                                <span className='text-[rgba(0,0,0,.54)] cursor-pointer'>
                                    Đặt làm địa chỉ mặc định
                                </span>
                            </label>
                        </div>
                        <div className='flex justify-end'>
                            <div className='w-[129px] cursor-pointer flex justify-center items-center rounded-sm px-[25px] py-[8px] text-[15px] font-medium hover:bg-[#f8f8f8]'>
                                Trở lại
                            </div>
                            <button
                                type='submit'
                                className='bg-[#ee4d2d] text-[#fff] flex justify-center items-center rounded-sm px-[25px] py-[8px] text-[15px] font-medium'
                            >
                                Hoàn thành
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddressSettingPopupComponent

import React from 'react'

const Account = () => {
    return (
        <div>
            <span>Chỉnh sửa hồ sơ</span>
            <div>
                <span>Thông tin người dùng</span>
                <div>
                    <div className='flex items-center'>
                        <div className='flex flex-col space-y-2'>
                            <span className='text-[14px] text-[#303030]'>
                                Tên
                            </span>
                            <input className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]' />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <span className='text-[14px] text-[#303030]'>
                                Email
                            </span>
                            <input className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]' />
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='flex flex-col space-y-2'>
                            <span className='text-[14px] text-[#303030]'>
                                Tên
                            </span>
                            <input className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]' />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <span className='text-[14px] text-[#303030]'>
                                Tên
                            </span>
                            <input className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Login } from '~/utils/interface'

const login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Login>({
        mode: 'onBlur',
    })

    const onSubmit: SubmitHandler<Login> = (data) => {
        console.log(data)
    }
    return (
        <div className='flex flex-col items-center justify-center space-y-4 mt-[100px]'>
            <span className='text-[25px]'>ĐĂNG NHẬP</span>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col space-y-4 w-[400px]'
            >
                <div className='flex flex-col space-y-2'>
                    <input
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Không được để trống email !',
                            },
                            pattern: {
                                value: /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/,
                                message: 'Email không đúng định dạng !',
                            },
                        })}
                        placeholder='Email'
                        className='outline-none border-solid border-[1px] border-[#CCCCCC] rounded-sm px-[10px] py-[8px]'
                    />
                    {errors.email && (
                        <p className='text-[red] text-[14px]'>
                            {errors.email?.message}
                        </p>
                    )}
                </div>
                <div className='flex flex-col space-y-2'>
                    <input
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'Vui lòng nhập mật khẩu để tiếp tục !',
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                message:
                                    'Mật khẩu phải từ 8 ký tự trở lên và đầy đủ ký tự hoa,thường và số ',
                            },
                        })}
                        placeholder='Password'
                        className='outline-none border-solid border-[1px] border-[#CCCCCC] rounded-sm px-[10px] py-[8px]'
                    />
                    {errors.password && (
                        <p className='text-[red] text-[14px]'>
                            {errors.password?.message}
                        </p>
                    )}
                </div>
                <div className='flex justify-end'>
                    <button className='bg-[#C91F28] text-[#fff] px-[18px] py-[9px] rounded-md hover:bg-[#DD242E]'>
                        Đăng nhập
                    </button>
                </div>
                <div className='flex items-center justify-center space-x-1'>
                    <span className='text-[#0782C5] cursor-pointer hover:underline'>
                        Quên mật khẩu?
                    </span>
                    <span className='text-[#959898]'>hoặc</span>
                    <span className='text-[#0782C5] cursor-pointer hover:underline'>
                        Đăng ký
                    </span>
                </div>
            </form>
        </div>
    )
}

export default login

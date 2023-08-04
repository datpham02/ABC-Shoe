import Link from 'next/link'
import React from 'react'
import { RegisterData } from '~/utils/interface'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSession, signIn, signOut } from 'next-auth/react'

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterData>({
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            password: '',
            confirm_password: '',
        },
    })

    const onSubmit: SubmitHandler<RegisterData> = (data) => {
        console.log(data)
    }
    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-row w-full h-screen'
            >
                <div className='hidden lg:flex flex-col justify-center bg-[#ffe85c] lg:p-8 xl:p-12 lg:max-w-lg xl:max-w-2xl'>
                    <div className='flex items-center justify-start space-x-3'>
                        <span className='bg-black rounded-full w-8 h-8'></span>
                        <Link href='/'>
                            <span className='font-medium text-xl'>ABC</span>
                        </Link>
                    </div>
                    <div className='space-y-5'>
                        <h1 className='lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold'>
                            Chào mừng đến với ABCShoe
                        </h1>
                        <p className='text-lg'>Bạn đã có tài khoản?</p>
                        <Link href={'/login'}>
                            <button className='inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white'>
                                Đăng nhập ngay
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='flex flex-1 flex-col items-center justify-center px-10 relative'>
                    <div className='flex lg:hidden justify-between items-center w-full py-4'>
                        <div className='flex items-center justify-start space-x-3'>
                            <span className='bg-black rounded-full w-6 h-6'></span>
                            <Link href={'/'}>
                                <span className='font-medium text-lg'>ABC</span>
                            </Link>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <span>Bạn đã có tài khoản? </span>
                            <Link href='/login'>
                                <span className='underline font-medium text-[#070eff]'>
                                    Tạo tài khoản ngay
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className='w-full flex flex-1 flex-col  lg:justify-center lg:mt-[0] mt-[25px] space-y-5 max-w-md'>
                        <h2 className='text-3xl md:text-4xl font-bold text-center'>
                            Tạo tài khoản
                        </h2>
                        <div className='flex flex-col max-w-md space-y-5'>
                            <div className='flex flex-col space-y-2'>
                                <input
                                    type='Email'
                                    placeholder='Tài khoản'
                                    className='flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal'
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message:
                                                'Không được để trống email !',
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                            message:
                                                'Email không đúng định dạng !',
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <p className='text-[red] text-[14px]'>
                                        {errors.email?.message}
                                    </p>
                                )}
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <input
                                    type='password'
                                    placeholder='Mật khẩu'
                                    className='flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal'
                                    {...register('password', {
                                        required: {
                                            value: true,
                                            message:
                                                'Vui lòng nhập mật khẩu để tiếp tục !',
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                            message:
                                                'Mật khẩu phải từ 8 ký tự trở lên và đầy đủ ký tự hoa,thường và số ',
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <p className='text-[red] text-[14px]'>
                                        {errors.password?.message}
                                    </p>
                                )}
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <input
                                    type='password'
                                    placeholder='Nhập lại mật khẩu'
                                    className='flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal'
                                    {...register('confirm_password', {
                                        required: {
                                            value: true,
                                            message:
                                                'Vui lòng nhập lại mật khẩu để tiếp tục !',
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                            message:
                                                'Mật khẩu phải từ 8 ký tự trở lên và đầy đủ ký tự hoa,thường và số ',
                                        },
                                        validate: (value, formValue) => {
                                            return (
                                                value != formValue.password &&
                                                'Mật khẩu không khớp, vui lòng nhập lại'
                                            )
                                        },
                                    })}
                                />
                                {errors.confirm_password && (
                                    <p className='text-[red] text-[14px]'>
                                        {errors.confirm_password?.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type='submit'
                                className='flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white'
                            >
                                Đăng ký
                            </button>
                            <div className='flex justify-center items-center'>
                                <span className='w-full border border-black'></span>
                                <span className='px-4'>Hoặc</span>
                                <span className='w-full border border-black'></span>
                            </div>
                            <span
                                onClick={() => {
                                    signIn('google')
                                }}
                                className='cursor-pointer flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black relative'
                            >
                                <span className='absolute left-4'>
                                    <svg
                                        width='24px'
                                        height='24px'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                        xmlnsXlink='http://www.w3.org/1999/xlink'
                                    >
                                        <path
                                            fill='#EA4335 '
                                            d='M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z'
                                        />
                                        <path
                                            fill='#34A853'
                                            d='M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z'
                                        />
                                        <path
                                            fill='#4A90E2'
                                            d='M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z'
                                        />
                                        <path
                                            fill='#FBBC05'
                                            d='M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z'
                                        />
                                    </svg>
                                </span>
                                <span>Đăng nhập với Google</span>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register

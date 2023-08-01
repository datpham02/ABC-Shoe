import React, { useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { SubmitHandler, useForm } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import {
    SubscribeData as SubscribeDataType,
    SubscribeFormComponent as SubscribeFormComponentType,
} from '~/utils/interface'

const SubscribeFormComponent = ({
    status,
    submit,
    className,
}: SubscribeFormComponentType) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SubscribeDataType>({
        defaultValues: {
            email: '',
        },
    })

    const onSubmitSubscribe: SubmitHandler<SubscribeDataType> = (data) => {
        submit({ EMAIL: data.email })
        reset({ email: '' })
    }
    useEffect(() => {
        if (status == 'sending') {
            toast.loading('Đang đăng ký...')
        }
        if (status == 'success') {
            toast.dismiss()
            toast.success('Đăng ký thành công')
        }
        if (status == 'error') {
            toast.dismiss()
            toast.error('Đăng ký thất bại')
        }
    }, [status])
    return (
        <form
            className={twMerge(
                "bg-[url('/subscripe-bg.webp')] w-full h-[300px] flex flex-col space-y-5 items-center justify-center",
                className,
            )}
            onSubmit={handleSubmit(onSubmitSubscribe)}
        >
            <div className='text-[30px] font-semibold text-[#fff]'>
                Đăng kí ngay để nhận tin tức
            </div>
            <div className='relative flex items-center w-[500px]'>
                <div className='w-full flex flex-col space-y-2'>
                    <input
                        type='email'
                        placeholder='Nhập email'
                        autoComplete='off'
                        className='w-full py-[10px] pl-[10px] pr-[5px] border-b-[2px] border-b-[#515151] outline-none bg-transparent text-[#fff]'
                        {...register('email', {
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                message: 'Email không đúng định dạng !',
                            },
                        })}
                    />
                    {errors.email && (
                        <p className='text-[red] text-[14px]'>
                            {errors.email?.message as string}
                        </p>
                    )}
                </div>
                <button type='submit' className='text-[#fff] absolute right-0'>
                    Đăng ký
                </button>
            </div>
        </form>
    )
}

export default SubscribeFormComponent

import { AiOutlineSearch } from 'react-icons/ai'
import React from 'react'
import axios from 'axios'
import queryClient from '~/lib/use_query'
import { toast } from 'react-hot-toast'
import { twMerge } from 'tailwind-merge'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'

const AddAddressFormComponent = ({
    className,
    hiddenAddressForm,
    updateData,
}: {
    className?: string
    hiddenAddressForm: () => void
    updateData?: {
        id: string
        name: string
        phone: string
        address: string
        location: string
        isDefault: boolean
    } | null
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: updateData?.name ?? '',
            phone: updateData?.phone ?? '',
            address: updateData?.address ?? '',
            location: updateData?.location ?? '',
            isDefault: updateData?.isDefault ?? false,
        },
    })

    const { mutate } = useMutation({
        mutationKey: ['add_address'],
        mutationFn: async (dataAddress: {
            name: string
            phone: string
            address: string
            location: string
            isDefault: boolean
        }) => {
            if (updateData) {
                const { data } = await axios.post('/api/create/address', {
                    ...dataAddress,
                    id: updateData.id,
                })
                return data
            } else {
                const { data } = await axios.post('/api/create/address', {
                    ...dataAddress,
                })
                return data
            }
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(data.msg)
                queryClient.setQueryData(['get_address'], data.address)
            } else toast.error(data.msg)
        },
        onError: () => {
            toast.error('Có lỗi xảy ra, xin hãy f5 lại để tiếp tục !')
        },
    })
    const onSubmit = (data: any) => {
        mutate(data)
        reset()
        hiddenAddressForm()
    }
    return (
        <div
            className={twMerge(
                'w-full h-full justify-center items-center transition-all duration-200 ease-in-out',
                className,
            )}
        >
            <div className='bg-[#fff] rounded-sm flex flex-col gap-4 p-[25px]'>
                <span className='font-medium text-[20px]'>
                    Cập nhập địa chỉ
                </span>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='w-full h-full flex flex-col gap-6'
                >
                    <div className='flex gap-4'>
                        <div className='relative flex'>
                            <label className='absolute text-[12px] top-[-10px] left-[14px] bg-[#fff] text-[rgba(0,0,0,.4)]  px-[3px]'>
                                Họ và tên
                            </label>
                            <div className='flex flex-col space-y-2'>
                                <input
                                    className='outline-none border-solid border-[1px] border-[#dbdbdb] bg-transparent rounded-sm p-[10px] h-[38px]'
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message:
                                                'Không được để trống họ và tên !',
                                        },
                                    })}
                                />
                                {errors && (
                                    <p className='text-[red] text-[14px]'>
                                        {errors.name?.message as string}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className='relative flex'>
                            <label className='absolute text-[12px] top-[-10px] left-[14px] bg-[#fff] text-[rgba(0,0,0,.4)]  px-[3px]'>
                                Số điện thoại
                            </label>

                            <div className='flex flex-col space-y-2'>
                                <input
                                    className='outline-none border-solid border-[1px] border-[#dbdbdb] bg-transparent rounded-sm p-[10px] h-[38px]'
                                    {...register('phone', {
                                        required: {
                                            value: true,
                                            message:
                                                'Không được để trống số điện thoại !',
                                        },
                                    })}
                                />
                                {errors && (
                                    <p className='text-[red] text-[14px]'>
                                        {errors.phone?.message as string}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='relative flex'>
                        <label className='absolute z-50 text-[12px] top-[-10px] left-[14px] bg-[#fff] text-[rgba(0,0,0,.4)]  px-[3px]'>
                            Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã
                        </label>
                        <div className='relative w-full flex items-center '>
                            <div className='w-full flex flex-col space-y-2'>
                                <input
                                    {...register('location', {
                                        required: {
                                            value: true,
                                            message:
                                                'Không được để trống vị trí !',
                                        },
                                    })}
                                    placeholder='Tỉnh/ Thành phố, Quận/Huyện, Phường/Xã'
                                    className=' outline-none placeholder:text-[16px] placeholder:font-[450] placeholder:text-[#dbdbdb] border-solid border-[1px] border-[#dbdbdb] bg-transparent rounded-sm p-[10px] h-[38px] w-full'
                                />
                                {errors && (
                                    <p className='text-[red] text-[14px]'>
                                        {errors.location?.message as string}
                                    </p>
                                )}
                            </div>
                            <span className='absolute hidden right-[15px] items-center justify-center'>
                                <AiOutlineSearch className='w-[22px] h-[22px] text-[#dbdbdb]' />
                            </span>
                        </div>
                    </div>
                    <div className='relative flex'>
                        <label className='absolute text-[12px] top-[-10px] left-[14px] bg-[#fff] text-[rgba(0,0,0,.4)]  px-[3px]'>
                            Địa chỉ cụ thể
                        </label>

                        <div className='w-full flex flex-col space-y-2'>
                            <textarea
                                rows={2}
                                style={{
                                    resize: 'none',
                                }}
                                className='outline-none border-solid border-[1px] border-[#dbdbdb] bg-transparent rounded-sm p-[10px] w-full'
                                {...register('address', {
                                    required: {
                                        value: true,
                                        message:
                                            'Không được để trống địa chỉ !',
                                    },
                                })}
                            />
                            {errors && (
                                <p className='text-[red] text-[14px]'>
                                    {errors.address?.message as string}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input
                            id='default_address'
                            className='border-[#dbdbdb] rounded-sm outline-none focus:shadow-none focus:ring-transparent checked:bg-[#ee4d2d] checked:hover:bg-[#ee4d2d]   focus:checked:bg-[#ee4d2d]  '
                            type={'checkbox'}
                            {...register('isDefault')}
                        />
                        <label htmlFor='default_address'>
                            <span className='text-[rgba(0,0,0,.54)] cursor-pointer'>
                                Đặt làm địa chỉ mặc định
                            </span>
                        </label>
                    </div>
                    <div className='flex justify-end'>
                        <div
                            onClick={() => {
                                hiddenAddressForm()
                            }}
                            className='w-[129px] cursor-pointer flex justify-center items-center rounded-sm px-[25px] py-[8px] text-[15px] font-medium hover:bg-[#f8f8f8]'
                        >
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
    )
}

export default AddAddressFormComponent

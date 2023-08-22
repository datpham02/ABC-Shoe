import React, { useEffect, useState } from 'react'
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'
import { AddressComponent as AddressComponentType } from '~/utils/interface'
import { Radio } from '@material-tailwind/react'
import AddAddressFormComponent from './AddAddressFormComponent'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import queryClient from '~/lib/use_query'

const AddressSettingPopupComponent = ({
    className,
    handlShowAddressSetting,
}: AddressComponentType) => {
    const [updateAddressData, setUpdateAddressData] = useState<{
        id: string
        name: string
        phone: string
        address: string
        location: string
        isDefault: boolean
    } | null>(null)
    const [addAddressFormShow, setAddAddressFormShow] = useState<boolean>(false)
    const { data: address } = useQuery({
        queryKey: ['get_address'],
        queryFn: async () => {
            const { data } = await axios.get('/api/get/address')
            return data.address
        },
    })
    const [addressChecked, setAddressChecked] = useState<{
        id: string
        name: string
        phone: string
        address: string
        location: string
        isDefault: boolean
    }>({
        id: '',
        name: '',
        phone: '',
        address: '',
        location: '',
        isDefault: false,
    })

    const { mutate: deleteAddress } = useMutation({
        mutationKey: ['delete_address'],
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(`/api/delete/address?id=${id}`)
            return data
        },
        onSuccess: (data) => {
            if (data.sucess) {
                toast.success(data.msg)
                queryClient.setQueryData(['get_address'], data.address)
            } else toast.error(data.msg)
        },
        onError: () => {
            toast.error('Có lỗi xảy ra, xin hãy f5 lại để tiếp tục !')
        },
    })
    const { mutate: setDefaultAddress } = useMutation({
        mutationKey: ['set_default_address'],
        mutationFn: async (dataUpdate: {
            id: string
            name: string
            phone: string
            address: string
            location: string
            isDefault: boolean
        }) => {
            const { data } = await axios.post(`/api/update/address`, {
                ...dataUpdate,
                isDefault: true,
            })
            return data
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
    useEffect(() => {
        if (address) {
            setAddressChecked(
                address.filter(
                    (address: {
                        id: string
                        name: string
                        phone: string
                        address: string
                        location: string
                        isDefault: boolean
                    }) => address.isDefault == true,
                )[0],
            )
        }
    }, [address])
    return (
        <>
            {addAddressFormShow ? (
                <AddAddressFormComponent
                    className={className}
                    hiddenAddressForm={() => {
                        setAddAddressFormShow(false)
                    }}
                    updateData={updateAddressData}
                />
            ) : (
                <div className={twMerge('flex flex-col', className)}>
                    <div className='flex flex-col bg-[#fff] py-[15px] px-[25px] w-full'>
                        <div className='flex justify-between'>
                            <span className='font-medium text-[20px]'>
                                Địa chỉ của tôi
                            </span>
                            <span
                                onClick={() => {
                                    setAddAddressFormShow(true)
                                }}
                                className='flex gap-2 bg-[#ee4d2d] items-center px-[15px] py-[10px] rounded-sm'
                            >
                                <AiOutlinePlus className='text-[#fff] w-[22px] h-[22px]' />
                                <span className='text-[#fff]'>
                                    Thêm địa chỉ mới
                                </span>
                            </span>
                        </div>
                        <hr className='my-[15px]' />
                        <div className='flex flex-col'>
                            {address?.map(
                                (address: {
                                    id: string
                                    name: string
                                    phone: string
                                    location: string
                                    address: string
                                    isDefault: boolean
                                    userId: string
                                }) => (
                                    <div
                                        key={address.id}
                                        className='flex flex-col space-y-3 cursor-pointer'
                                    >
                                        <div className='flex items-center space-x-2'>
                                            <div className='h-full flex items-start'>
                                                <Radio
                                                    name='address'
                                                    defaultChecked={
                                                        address.isDefault
                                                    }
                                                    onClick={() => {
                                                        setAddressChecked(
                                                            address,
                                                        )
                                                    }}
                                                />
                                            </div>
                                            <div className='h-full flex justify-between items-center space-x-2'>
                                                <div className='flex flex-col space-y-1 flex-1'>
                                                    <div className='flex gap-2'>
                                                        <span className='font-normal text-[black]'>
                                                            {address.name}
                                                        </span>
                                                        <span className='border-solid border-l border-[rgba(0,0,0,.26)] pl-[5px] text-[rgba(0,0,0,.54)]'>
                                                            (+84){' '}
                                                            {address.phone.slice(
                                                                1,
                                                                -1,
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className='flex flex-col'>
                                                        <div className='text-[rgba(0,0,0,.54)]'>
                                                            {address.address}
                                                        </div>
                                                        <div className='text-[rgba(0,0,0,.54)]'>
                                                            {address.location}
                                                        </div>
                                                    </div>
                                                    {address.isDefault ? (
                                                        <div className='flex justify-start'>
                                                            <div className='flex justify-center items-center border-solid border-[1px] border-[#ee4d2d] text-[#ee4d2d] px-[3px] text-[14px] font-medium'>
                                                                Mặc định
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className='h-full flex items-start'>
                                                    <div className='flex items-center space-x-2 mt-[15px]'>
                                                        <span
                                                            onClick={() => {
                                                                setUpdateAddressData(
                                                                    {
                                                                        address:
                                                                            address.address,
                                                                        id: address.id,
                                                                        isDefault:
                                                                            address.isDefault,
                                                                        location:
                                                                            address.location,
                                                                        name: address.name,
                                                                        phone: address.phone,
                                                                    },
                                                                )
                                                                setAddAddressFormShow(
                                                                    true,
                                                                )
                                                            }}
                                                            className='text-[#08f] cursor-pointer'
                                                        >
                                                            Cập nhập
                                                        </span>
                                                        <span
                                                            onClick={() => {
                                                                deleteAddress(
                                                                    address.id,
                                                                )
                                                            }}
                                                            className='text-[#08f] cursor-pointer'
                                                        >
                                                            Xóa
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className='my-[15px]' />
                                    </div>
                                ),
                            )}
                        </div>
                        <div className='flex items-center space-x-10 mt-[15px]'>
                            <span
                                onClick={() => {
                                    handlShowAddressSetting()
                                }}
                                className='cursor-pointer flex justify-center border-solid border-[1px] border-[#E8E8E8] items-center w-[50%] px-[15px] py-[10px] rounded-sm'
                            >
                                Hủy
                            </span>
                            <span
                                onClick={() => {
                                    setDefaultAddress(addressChecked)
                                    handlShowAddressSetting()
                                }}
                                className='cursor-pointer flex justify-center bg-[#ee4d2d] items-center w-[50%] px-[15px] py-[10px] rounded-sm text-[#fff]'
                            >
                                Xác nhận
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddressSettingPopupComponent

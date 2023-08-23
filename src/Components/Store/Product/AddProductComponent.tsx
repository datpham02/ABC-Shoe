import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { ProductData } from '~/utils/interface'
import { useMutation, useQuery } from '@tanstack/react-query'
import AddCategoryComponent from './AddCategoryComponent'
import EditorComponent from '~/Components/Editor/EditorComponent'
import { uploadImgCloudinary } from '~/utils/func'
import AddImgComponent from './AddImgComponent'
import AddClassifyComponent from './AddClassifyComponent'

const AddProductComponent = () => {
    const methods = useForm()

    const [addCategoryFormShow, setAddCategoryFormShow] =
        useState<Boolean>(false)

    const { data: category } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            const { data } = await axios.get('/api/get/category?all=true')
            return data.categorys
        },
        staleTime: 60 * 1000,
    })

    const { mutate } = useMutation({
        mutationKey: ['add_product'],
        mutationFn: async (product: ProductData) => {
            const { data } = await axios.post('/api/create/product', {
                name: product.name,
                cost: product.cost,
                price: product.price,
                description: product.description,
                image: product.image,
                status: product.status,
                size: product.size,
                quantity: product.quantity,
                categoryId: product.categoryId,
                productChild: product.productChild,
            })
            return data
        },
        onSuccess: (response) => {
            if (response.success) {
                toast.dismiss()
                toast.success('Thêm sản phẩm thành công !')
            }
        },

        onError: () => {
            toast.dismiss()
            toast.error('Thêm sản phẩm thất bại !')
        },
    })

    const hanleShowAddCateogryForm = () => {
        setAddCategoryFormShow(true)
        document.body.style.overflowY = 'hidden'
    }
    const hanleHiddenAddCateogryForm = () => {
        setAddCategoryFormShow(false)
        document.body.style.overflowY = 'auto'
    }

    const onSubmit = async (data: any) => {
        toast.loading('Đang thực hiện thêm sản phảm mới . . .')
        const imgUrl = await Promise.all(
            methods
                .getValues('image')
                .map((imgFile: File) => uploadImgCloudinary(imgFile)),
        )

        mutate({
            ...data,
            ...methods.getValues('classify')[0],
            image: imgUrl.map((img) => img.secure_url),
            productChild: methods
                .getValues('classify')
                .slice(1, methods.getValues('classify').length)
                .map(
                    (classify: {
                        size: string
                        quantity: number
                        cost: number
                        price: number
                    }) => {
                        return {
                            ...data,
                            ...classify,
                            image: imgUrl.map((img) => img.secure_url),
                        }
                    },
                ),
        })
        methods.reset()
    }

    return (
        <>
            <FormProvider {...methods}>
                <form className='flex flex-col px-[180px]'>
                    <div className='w-full flex flex-col space-y-5 py-[15px]'>
                        <span className='text-[20px] font-semibold'>
                            Thêm sản phẩm
                        </span>

                        <div className='flex space-x-4'>
                            <div className='w-[70%] flex flex-col space-y-2'>
                                <div className='bg-[#fff] flex flex-col space-y-4 px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md'>
                                    <Controller
                                        render={({
                                            field: { onChange },
                                            fieldState: { error },
                                        }) => (
                                            <div className='flex flex-col space-y-2'>
                                                <span className='text-[14px] text-[#303030] font-semibold'>
                                                    Tiêu đề(tên sản phẩm)
                                                </span>

                                                <div className='flex flex-col space-y-2'>
                                                    <input
                                                        onChange={onChange}
                                                        className='outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                                                    />
                                                    {error && (
                                                        <p className='text-[red] text-[14px]'>
                                                            {
                                                                error.message as string
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        control={methods.control}
                                        name='name'
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    'Không được để trống tiêu đề(tên sản phẩm)',
                                            },
                                        }}
                                    />
                                    <Controller
                                        render={({
                                            field: { onChange, value },
                                            fieldState: { error },
                                        }) => (
                                            <div className='flex flex-col space-y-2'>
                                                <span className='text-[14px] text-[#303030] font-semibold'>
                                                    Mô tả
                                                </span>
                                                <EditorComponent
                                                    value={value}
                                                    onChange={onChange}
                                                    error={error}
                                                />
                                            </div>
                                        )}
                                        control={methods.control}
                                        name='description'
                                        rules={{
                                            required: {
                                                value: true,
                                                message:
                                                    'Không được để trống mô tả sản phẩm !',
                                            },
                                        }}
                                    />
                                </div>
                                <AddImgComponent />
                                <AddClassifyComponent />
                            </div>
                            <div className='w-[30%] flex flex-col space-y-2'>
                                <div className='flex flex-col space-y-2 bg-[#fff] rounded-md shadow-sm border-solid border-[1px] px-[20px] py-[15px] '>
                                    <span className='text-[14px] text-[#303030] font-semibold'>
                                        Trạng thái
                                    </span>
                                    <select
                                        className='w-full flex items-center text-[14px] outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[10px] py-[8px]'
                                        {...methods.register('status', {
                                            required: true,
                                        })}
                                    >
                                        <option value='Đang hoạt động'>
                                            Đang hoạt động
                                        </option>
                                        <option value='Hết hàng'>
                                            Hết hàng
                                        </option>
                                        <option value='Bản nháp'>
                                            Bản nháp
                                        </option>
                                    </select>
                                </div>
                                <div className='flex flex-col space-y-2 bg-[#fff] rounded-md shadow-sm border-solid border-[1px] px-[20px] py-[15px] '>
                                    <span className='text-[14px] text-[#303030] font-semibold'>
                                        Sắp xếp sản phẩm
                                    </span>
                                    <div className='flex flex-col space-y-2 px-[8px]'>
                                        <span className='text-[14px] text-[#303030]'>
                                            Danh mục sản phẩm
                                        </span>
                                        <select
                                            className='w-full flex items-center text-[14px] outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[10px] py-[8px]'
                                            {...methods.register('categoryId', {
                                                required: true,
                                            })}
                                        >
                                            {category?.length > 0 ? (
                                                category.map(
                                                    (
                                                        category: {
                                                            id: string
                                                            name: string
                                                        },
                                                        index: number,
                                                    ) => (
                                                        <option
                                                            defaultChecked={
                                                                index == 0
                                                            }
                                                            key={category.id}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </option>
                                                    ),
                                                )
                                            ) : (
                                                <option value=''>
                                                    Chưa có danh mục nào
                                                </option>
                                            )}
                                        </select>
                                        <div className='flex justify-end space-x-2 py-[15px]'>
                                            <span
                                                onClick={() => {
                                                    hanleShowAddCateogryForm()
                                                }}
                                                className='cursor-pointer hover:text-[#000] px-[12px] py-[5px] text-[#fff] bg-[#CBCBCB] rounded-md'
                                            >
                                                Tạo
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end py-[20px]'>
                        <span
                            onClick={methods.handleSubmit(onSubmit)}
                            className='hover:text-[#000] cursor-pointer px-[12px] py-[5px] text-[#fff] bg-[#CBCBCB] rounded-md'
                        >
                            Thêm
                        </span>
                    </div>
                </form>
            </FormProvider>
            {addCategoryFormShow ? (
                <AddCategoryComponent onClose={hanleHiddenAddCateogryForm} />
            ) : null}
        </>
    )
}

export default AddProductComponent

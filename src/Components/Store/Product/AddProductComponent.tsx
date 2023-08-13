import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Product } from '~/utils/interface'
import { useMutation } from '@tanstack/react-query'
import ClassifyComponent from './ClassifyComponent'
import AddCategoryComponent from './AddCategoryComponent'
import EditorComponent from '~/Components/Editor/EditorComponent'

const AddProduct = () => {
    const methods = useForm()
    const [addCategoryFormShow, setAddCategoryFormShow] =
        useState<Boolean>(false)
    const { data } = useMutation({
        mutationKey: ['add_product'],
        mutationFn: async (product: Product) => {
            const { data } = await axios.post('/create/product', {
                name: product.name,
                price: product.price,
                cost: product.cost,
                description: product.description,
                quantity: product.quantity,
                image: product.image,
                classify: product.classify,
                categoryId: product.categoryId,
            })
            return data
        },
        onSuccess: (response) => {
            if (response.data.success) {
                toast.success(response.data.msg)
            } else toast.error(response.data.msg)
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

    const onSubmit = (data: any) => console.log(data)
    return (
        <>
            <FormProvider {...methods}>
                <form className='flex flex-col px-[180px]'>
                    <div className='w-full flex flex-col space-y-5 py-[15px]'>
                        <span className='text-[20px] font-semibold'>
                            Thêm sản phẩm
                        </span>
                        <div className='flex space-x-2'>
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
                                        name='title'
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
                                <div className='group bg-[#fff] flex flex-col space-y-2  px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md'>
                                    <span className='text-[14px] text-[#303030] font-semibold'>
                                        Video,hình ảnh
                                    </span>
                                    <input
                                        id='file'
                                        type='file'
                                        multiple
                                        {...methods.register('img', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Không được để trống !',
                                            },
                                        })}
                                        className='hidden'
                                    />
                                    <div className='flex flex-col space-y-2'>
                                        <div className='flex flex-wrap gap-2 border-solid border-[1px] rounded-md'>
                                            <label
                                                htmlFor='file'
                                                className='w-full flex flex-1'
                                            >
                                                <div className='group-hover:bg-[#F7F7F7] w-full h-[150px] rounded-md border-dashed border-[1px] border-[#000] flex items-center justify-center'>
                                                    <div className='flex flex-col items-center space-y-2'>
                                                        <div>
                                                            <span className='px-[12px] py-[6px] bg-[#fff] text-[#000] shadow-sm border-solid border-[1px]  rounded-md text-[14px] '>
                                                                Thêm tệp
                                                            </span>
                                                        </div>
                                                        <span className='text-[14px] text-[#616161]'>
                                                            Chấp nhận hình ảnh,
                                                            video
                                                        </span>
                                                    </div>
                                                </div>
                                            </label>
                                        </div>
                                        {methods.formState.errors.img && (
                                            <p className='text-[red] text-[14px]'>
                                                {
                                                    methods.formState.errors.img
                                                        ?.message as string
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className='bg-[#fff] flex flex-col space-y-4 px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md'>
                                    <span className='text-[14px] text-[#303030] font-semibold'>
                                        Định giá
                                    </span>
                                    <div className='flex flex-col space-y-4'>
                                        <div className='flex flex-col space-y-2'>
                                            <span>Giá gốc</span>
                                            <div className='relative flex items-center'>
                                                <input
                                                    {...methods.register(
                                                        'cost',
                                                        {
                                                            required: {
                                                                value: true,
                                                                message:
                                                                    'Không được để trống giá gốc !',
                                                            },
                                                        },
                                                    )}
                                                    placeholder='0'
                                                    className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                                                />
                                                <span className='absolute right-[10px] text-[#898F94]'>{`₫`}</span>
                                            </div>
                                        </div>
                                        <div className='flex flex-col space-y-2'>
                                            <span>Giá bán</span>
                                            <div className='relative flex items-center'>
                                                <input
                                                    {...methods.register(
                                                        'price',
                                                        {
                                                            required: {
                                                                value: true,
                                                                message:
                                                                    'Không được để trống giá bán !',
                                                            },
                                                        },
                                                    )}
                                                    placeholder='0'
                                                    className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                                                />
                                                <span className='absolute right-[10px] text-[#898F94]'>{`₫`}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-[#fff] flex flex-col space-y-4 px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md'>
                                    <span className='text-[14px] text-[#303030] font-semibold'>
                                        Kho hàng
                                    </span>
                                    <div className='flex flex-col space-y-3'>
                                        <div className='inline-flex flex-col space-y-2'>
                                            <span>Số lượng</span>
                                            <input
                                                {...methods.register(
                                                    'quantity',
                                                    {
                                                        required: {
                                                            value: true,
                                                            message:
                                                                'Không được để trống giá gốc !',
                                                        },
                                                    },
                                                )}
                                                type='number'
                                                placeholder='0'
                                                className='outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <ClassifyComponent />
                            </div>
                            <div className='w-[30%] flex flex-col space-y-2'>
                                <div className='flex flex-col space-y-2 bg-[#fff] px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md'>
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
                                <div className='flex flex-col space-y-2 bg-[#fff] px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md'>
                                    <span className='text-[14px] text-[#303030] font-semibold'>
                                        Sắp xếp sản phẩm
                                    </span>
                                    <div className='flex flex-col space-y-2'>
                                        <span className='text-[14px] text-[#303030]'>
                                            Danh mục sản phẩm
                                        </span>
                                        <select
                                            className='w-full flex items-center text-[14px] outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[10px] py-[8px]'
                                            {...methods.register('category', {
                                                required: true,
                                            })}
                                        >
                                            <option value=''>
                                                Chưa có danh mục nào
                                            </option>
                                        </select>
                                        <div className='flex justify-end space-x-2 py-[15px]'>
                                            <span
                                                onClick={() => {
                                                    hanleShowAddCateogryForm()
                                                }}
                                                className='cursor-pointer px-[12px] py-[5px] text-[#fff] bg-[#CBCBCB] rounded-md'
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
                        <input
                            type='button'
                            value='Lưu'
                            onClick={methods.handleSubmit(onSubmit)}
                            className='px-[12px] py-[5px] text-[#fff] bg-[#CBCBCB] rounded-md'
                        />
                    </div>
                </form>
            </FormProvider>
            {addCategoryFormShow ? (
                <AddCategoryComponent onClose={hanleHiddenAddCateogryForm} />
            ) : null}
        </>
    )
}

export default AddProduct

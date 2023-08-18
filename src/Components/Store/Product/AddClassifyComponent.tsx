import React from 'react'
import { useForm } from 'react-hook-form'
import { ClassifyData } from '~/utils/interface'

const AddClassifyComponent = ({
    indexEdit,
    dataEdit = { quantity: 0, size: '' },
    onClose,
    addClassify,
    editClassify,
}: {
    onClose: () => void
    addClassify?: (data: ClassifyData) => void
    editClassify?: (index: number, data: ClassifyData) => void
    dataEdit?: ClassifyData
    indexEdit?: number
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ClassifyData>({
        defaultValues: {
            ...dataEdit,
        },
    })
    const onSubmit = (data: any) => {
        addClassify && addClassify(data)
        editClassify && editClassify(indexEdit as number, data)
        onClose()
    }

    return (
        <div className='fixed inset-0 z-[10] w-full h-full bg-[rgba(0,0,0,0.4)] flex items-center justify-center'>
            <form className='w-full px-[250px] flex flex-col space-y-2'>
                <div className='flex flex-col space-y-4 px-[20px] py-[15px] bg-[#fff] rounded-md'>
                    <span className='cursor-pointer text-[14px] text-[#303030] font-semibold'>
                        Phân loại
                    </span>
                    <div className='flex flex-col space-y-3'>
                        <div className='inline-flex flex-col space-y-2'>
                            <span>Số lượng</span>
                            <input
                                {...register('quantity', {
                                    required: {
                                        value: true,
                                        message:
                                            'Không được để trống giá gốc !',
                                    },
                                    valueAsNumber: true,
                                })}
                                type='number'
                                placeholder='0'
                                className='outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                            />
                        </div>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <span>Size</span>
                        <input
                            {...register('size', {
                                required: {
                                    value: true,
                                    message: 'Không được để trống !',
                                },
                            })}
                            className='w-full outline-none border-solid border-[1px] border-[#898F94] rounded-md px-[5px] py-[3px]'
                        />
                    </div>
                    <div className='flex justify-center space-x-2 py-[15px]'>
                        <span
                            onClick={onClose}
                            className='w-[50%] hover:text-[#000] text-center cursor-pointer px-[12px] py-[5px] text-[#fff] bg-[#CBCBCB] rounded-md'
                        >
                            Hủy
                        </span>
                        <input
                            type='button'
                            value='Submit'
                            onClick={handleSubmit(onSubmit)}
                            className='w-[50%] hover:text-[#000] cursor-pointer px-[12px] py-[5px] text-[#fff] bg-[#CBCBCB] rounded-md'
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddClassifyComponent

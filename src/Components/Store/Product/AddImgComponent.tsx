import React, { ChangeEvent, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { objectURL } from '~/utils/func'

const AddImgComponent = () => {
    const {
        register,
        formState: { errors },
        setValue,
        getValues,
    } = useFormContext()
    const [file, setFile] = useState<File | null>(null)
    const [removeImg, setRemoveImg] = useState<File[]>([])
    const [data, setData] = useState<{ file: File; preview: string }[]>([])

    useEffect(() => {
        if (file) {
            const data_file = data.map((file) => file.file)
            setData([...data, { file: file, preview: objectURL(file) }])
            setValue('image', [...data_file, file])
            setFile(null)
        }
    }, [file])

    const handleCheckedRemoveImg = (
        e: ChangeEvent<HTMLInputElement>,
        fileData: File,
    ) => {
        if (e.target.checked) {
            setRemoveImg([...removeImg, fileData])
        } else {
            const temp = removeImg.filter((file) => file != fileData)
            setRemoveImg(temp)
        }
    }
    const handleRemoveImg = () => {
        const temp = data.filter((file) => !removeImg.includes(file.file))
        setData(temp)
        setValue('image', temp)

        data.forEach((file) => {
            URL.revokeObjectURL(file.preview)
        })
        setRemoveImg([])
    }
    useEffect(() => {
        if (!getValues('image')) {
            data.forEach((file) => {
                URL.revokeObjectURL(file.preview)
            })
            setData([])
            setRemoveImg([])
        }
    }, [getValues('image')])
    return (
        <div className='bg-[#fff] flex flex-col space-y-2  px-[20px] py-[15px] shadow-sm border-solid border-[1px] rounded-md'>
            <div className='flex items-center justify-between'>
                <span className='text-[14px] text-[#303030] font-semibold'>
                    Video,hình ảnh
                </span>
                {removeImg.length > 0 ? (
                    <span
                        onClick={() => {
                            handleRemoveImg()
                        }}
                        className='text-[red] cursor-pointer'
                    >
                        Xóa tệp
                    </span>
                ) : null}
            </div>
            <input
                id='file'
                onChange={(e) => {
                    if (e.target.files) {
                        setFile(e.target.files[0])
                        e.target.value = ''
                    }
                }}
                type='file'
                className='hidden'
            />
            <input
                {...register('image', {
                    required: {
                        value: true,
                        message: 'Không được để trống !',
                    },
                })}
                className='hidden'
            />
            {data.length > 0 ? (
                <div className='grid grid-cols-2 gap-2'>
                    <div className='col-span-1 w-[300px] h-[280px] border-solid border-[1px] rounded-md py-[10px] relative'>
                        <div className='absolute w-full h-full top-[3px] left-[5px] group-hover:bg-[#00000080] rounded-md'>
                            <input
                                onChange={(e) => {
                                    handleCheckedRemoveImg(e, data[0].file)
                                }}
                                placeholder='checkbox'
                                type='checkbox'
                                className='focus:opacity-100 cursor-pointer w-[15px] h-[15px]'
                            />
                        </div>
                        <img
                            className='w-full h-full object-contain'
                            src={data[0].preview}
                        />
                    </div>
                    <div className='col-span-1'>
                        <div className='grid grid-cols-2 gap-2'>
                            {[1, 2, 3, 4].map((indexImg) => {
                                if (data[indexImg]?.file) {
                                    return (
                                        <div
                                            key={
                                                data[indexImg].file.name +
                                                indexImg
                                            }
                                            className='col-span-1 w-[150px] h-[150px] border-solid border-[1px] rounded-md py-[10px] relative'
                                        >
                                            <div className='absolute w-full h-full top-[3px] left-[5px] group-hover:bg-[#00000080] rounded-md'>
                                                <input
                                                    placeholder='checkbox'
                                                    type='checkbox'
                                                    onChange={(e) => {
                                                        handleCheckedRemoveImg(
                                                            e,
                                                            data[indexImg].file,
                                                        )
                                                    }}
                                                    className='focus:opacity-100 cursor-pointer w-[15px] h-[15px]'
                                                />
                                            </div>
                                            <img
                                                className='w-full h-full object-contain'
                                                src={data[indexImg].preview}
                                            />
                                        </div>
                                    )
                                }
                            })}
                            {data.length < 5 ? (
                                <div className='col-span-1'>
                                    <div className='w-full h-full flex flex-col space-y-2'>
                                        <label
                                            htmlFor='file'
                                            className='group w-full flex flex-1'
                                        >
                                            <div className='group-hover:bg-[#F7F7F7] p-[5px] w-full h-[150px] rounded-md border-dashed border-[1px] border-[#000] flex items-center justify-center'>
                                                <div className='flex flex-col items-center space-y-2'>
                                                    <div>
                                                        <span className='px-[12px] py-[6px] bg-[#fff] text-[#000] shadow-sm border-solid border-[1px]  rounded-md text-[14px] '>
                                                            Thêm tệp
                                                        </span>
                                                    </div>
                                                    <span className='text-[14px] text-center text-[#616161]'>
                                                        Chấp nhận hình ảnh
                                                    </span>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            ) : (
                <div className='w-full h-full flex flex-1 flex-col space-y-2'>
                    <label htmlFor='file' className='group w-full flex flex-1'>
                        <div className='group-hover:bg-[#F7F7F7] p-[5px] w-full h-[150px] rounded-md border-dashed border-[1px] border-[#000] flex items-center justify-center'>
                            <div className='flex flex-col items-center space-y-2'>
                                <div>
                                    <span className='px-[12px] py-[6px] bg-[#fff] text-[#000] shadow-sm border-solid border-[1px]  rounded-md text-[14px] '>
                                        Thêm tệp
                                    </span>
                                </div>
                                <span className='text-[14px] text-[#616161]'>
                                    Chấp nhận hình ảnh
                                </span>
                            </div>
                        </div>
                    </label>

                    {errors.image && (
                        <p className='text-[red] text-[14px]'>
                            {errors.image?.message as string}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}

export default AddImgComponent

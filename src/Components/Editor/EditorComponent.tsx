import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { EditorComponent as EditorComponentType } from '~/utils/interface'
import dynamic from 'next/dynamic'
import { useFormContext } from 'react-hook-form'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const EditorComponent = ({
    value,
    onChange,
    error,
    className,
}: EditorComponentType) => {
    return (
        <div className={twMerge('h-[280px]', className)}>
            <div className='w-full h-full flex flex-col space-y-12'>
                <ReactQuill
                    className='w-full h-[80%]'
                    value={value}
                    onChange={onChange}
                />
                {error && (
                    <p className='text-[red] text-[14px]'>
                        {error.message as string}
                    </p>
                )}
            </div>
        </div>
    )
}

export default EditorComponent

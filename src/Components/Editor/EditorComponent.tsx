import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { EditorComponent as EditorComponentType } from '~/utils/interface'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const EditorComponent = ({ className }: EditorComponentType) => {
    const [value, setValue] = useState<any>('')
    return (
        <div className={twMerge('h-[200px]', className)}>
            <ReactQuill
                className='w-full h-[70%]'
                value={value}
                onChange={setValue}
            />
        </div>
    )
}

export default EditorComponent

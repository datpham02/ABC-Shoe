import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import React from 'react'

const LoadingComponent = () => {
    return (
        <div className='w-full h-screen flex items-center justify-center'>
            <AiOutlineLoading3Quarters className='w-[50px] h-[50px] animate-spin' />
        </div>
    )
}

export default LoadingComponent

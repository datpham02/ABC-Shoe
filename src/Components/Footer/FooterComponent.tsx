import React from 'react'
import SubscripeComponent from './SubscripeComponent'

const FooterComponent = () => {
    return (
        <footer className='bg-white border-t-solid border-[1px] border-[#E5E5E5] mt-[50px] py-[40px]'>
            <SubscripeComponent />
            <div className='mt-[12px] px-[50px]'>
                <div className='sm:flex sm:justify-between'>
                    <p className='text-xs text-gray-500'>
                        &copy; Copyright © 2023. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default FooterComponent

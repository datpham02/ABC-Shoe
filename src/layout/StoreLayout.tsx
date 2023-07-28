import React from 'react'
import StoreLauoutSideBar from '~/Components/StoreLayout/StoreLauoutSideBar'
import { StoreLayout } from '~/utils/interface'

const StoreLayout = ({ children }: StoreLayout) => {
    return (
        <div className='flex'>
            <StoreLauoutSideBar className='w-[15%]' />
            <div className='w-[85%] px-[180px] bg-[#F1F1F1]'>{children}</div>
        </div>
    )
}

export default StoreLayout

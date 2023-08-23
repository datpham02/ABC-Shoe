import React from 'react'

import StoreSideBarComponent from '~/Components/Store/SideBar/StoreSideBarComponent'
import { StoreLayout } from '~/utils/interface'

const StoreLayout = ({ children }: StoreLayout) => {
    return (
        <div className='flex'>
            <StoreSideBarComponent className='w-[15%]' />
            <div className='w-[85%] bg-[#F1F1F1]'>{children}</div>
        </div>
    )
}

export default StoreLayout

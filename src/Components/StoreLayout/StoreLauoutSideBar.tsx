import React from 'react'
import { twMerge } from 'tailwind-merge'
import { StoreLauoutSideBar as StoreLauoutSideBarType } from '~/utils/interface'

const StoreLauoutSideBar = ({ className }: StoreLauoutSideBarType) => {
    return <div className={twMerge(className)}></div>
}

export default StoreLauoutSideBar

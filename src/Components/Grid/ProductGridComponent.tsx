import { ProductGridComponent as ProductGridComponentType } from '~/utils/interface'
import React from 'react'

const ProductGridComponent = ({ children }: ProductGridComponentType) => {
    return (
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 w-full h-full'>
            {children}
        </div>
    )
}

export default ProductGridComponent

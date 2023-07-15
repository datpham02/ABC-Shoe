import React from 'react'
import { ProductGridComponent } from '~/utils/interface'

const ProductGridComponent = ({ children }: ProductGridComponent) => {
    return (
        <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1'>
            {children}
        </div>
    )
}

export default ProductGridComponent

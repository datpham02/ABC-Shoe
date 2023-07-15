import React from 'react'

const Product = () => {
    return (
        <div className='h-[300px] overflow-hidden group flex flex-col space-y-2 border-solid border-[1px] px-[20px]'>
            <div className='h-[70%] w-full'>
                <img
                    className='w-full h-full object-contain scale-100 group-hover:scale-125 transition-all ease-linear duration-200'
                    src='https://product.hstatic.net/200000384421/product/air-jordan-1-low-aluminum-w_acd6_d0873f1007c546399b2b2874849a06c5.png'
                />
            </div>
            <div className='h-[30%] flex flex-col'>
                <span className='line-clamp-2 text-[14px]'>
                    Giày Nike Air Jordan 1 Low 'Aluminum' DC0774-141
                </span>
                <span className='text-[red]'>5,500,000</span>
            </div>
        </div>
    )
}

export default Product

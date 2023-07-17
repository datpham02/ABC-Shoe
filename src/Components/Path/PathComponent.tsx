import React from 'react'
import { capitalizeWords } from '~/utils/func'
import { PathComponent } from '~/utils/interface'

const PathComponent = ({ data, className }: PathComponent) => {
    return (
        <div className={className}>
            <div className='flex items-center space-x-2'>
                {data?.map((text, index) => (
                    <div className='flex items-center space-x-2'>
                        {index < data.length - 1 ? (
                            <>
                                <span className='text-[#0782c1]'>
                                    {capitalizeWords(text)}
                                </span>
                                <span className='text-[#ccc]'>/</span>
                            </>
                        ) : (
                            <span>{capitalizeWords(text)}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PathComponent

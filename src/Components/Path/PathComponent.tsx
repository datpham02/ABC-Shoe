import Link from 'next/link'
import React from 'react'
import { capitalizeWords } from '~/utils/func'
import { twMerge } from 'tailwind-merge'
import { PathComponent as PathComponentType } from '~/utils/interface'

const PathComponent = ({ data, className }: PathComponentType) => {
    return (
        <div
            className={twMerge(
                'flex items-center space-x-2 bg-[#F5F5F5]  py-[20px]',
                className,
            )}
        >
            {data?.map((path, index) => (
                <Link key={path.name + index} href={path.href}>
                    <div className='flex items-center space-x-2'>
                        {index < data.length - 1 ? (
                            <>
                                <span className='text-[#0782c1]'>
                                    {capitalizeWords(path.name)}
                                </span>
                                <span className='text-[#ccc]'>/</span>
                            </>
                        ) : (
                            <span>{capitalizeWords(path.name)}</span>
                        )}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default PathComponent

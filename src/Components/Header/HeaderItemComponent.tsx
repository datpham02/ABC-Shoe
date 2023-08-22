import React, { useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { HeaderItem } from '~/utils/interface'
import Tippy from '@tippyjs/react/headless'
import Link from 'next/link'
const HeaderItemComponent = ({ name, href, item }: HeaderItem) => {
    const [show, setShow] = useState<boolean>(false)

    const handleShow = () => {
        setShow(!show)
    }
    return (
        <>
            {item?.length > 0 ? (
                <Tippy
                    interactive
                    visible={show}
                    offset={[0, 19]}
                    onClickOutside={() => {
                        handleShow()
                    }}
                    render={(attrs) => (
                        <div
                            {...attrs}
                            className='bg-[#fff] w-[200px] shadow-md border-solid border-[1px] flex flex-col py-[15px]'
                        >
                            {item.map((data) => (
                                <Link
                                    key={data.name}
                                    href={data.href as string}
                                >
                                    <div className='w-full text-start px-[15px] py-[7px] hover:bg-[#E9EAEB]'>
                                        {data.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                >
                    {href != null ? (
                        <Link href={href}>
                            <div className='uppercase text-[16px] py-[9px] px-[18px] cursor-pointer flex items-center space-x-2 hover:text-[#D31F28]'>
                                <span>{name}</span>
                            </div>
                        </Link>
                    ) : (
                        <div
                            onClick={() => {
                                handleShow()
                            }}
                            className='uppercase text-[16px] py-[9px] px-[18px] cursor-pointer flex items-center space-x-2 hover:text-[#D31F28]'
                        >
                            <span>{name}</span>
                            {show ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </div>
                    )}
                </Tippy>
            ) : (
                <>
                    {href != null ? (
                        <Link href={href}>
                            <div className='uppercase text-[16px] py-[9px] px-[18px] cursor-pointer flex items-center space-x-2 hover:text-[#D31F28]'>
                                <span>{name}</span>
                            </div>
                        </Link>
                    ) : (
                        <div className='uppercase text-[16px] py-[9px] px-[18px] cursor-pointer flex items-center space-x-2 hover:text-[#D31F28]'>
                            <span>{name}</span>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default HeaderItemComponent

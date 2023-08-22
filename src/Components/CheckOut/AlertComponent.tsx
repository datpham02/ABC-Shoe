import React from 'react'
import {
    Dialog,
    DialogBody,
    DialogFooter,
    Typography,
} from '@material-tailwind/react'
import { MdDone } from 'react-icons/md'
import Link from 'next/link'
export default function NotificationDialog() {
    return (
        <>
            <Dialog open={true} handler={() => {}}>
                <DialogBody divider className='grid place-items-center gap-4'>
                    <div className='bg-[#b8e994] rounded-full p-[50px]'>
                        <MdDone className='w-[50px] h-[50px] text-[#fff]' />
                    </div>
                    <Typography color='#b8e994' variant='h4'>
                        Thanh toán thành công
                    </Typography>
                </DialogBody>
                <DialogFooter className='space-x-2'>
                    <Link href='/' className='outline-none'>
                        <span className='bg-[#c8d6e5] px-[18px] py-[10px] text-[#fff] rounded-md'>
                            Trang chủ
                        </span>
                    </Link>
                </DialogFooter>
            </Dialog>
        </>
    )
}

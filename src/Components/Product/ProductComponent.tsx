import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from '@material-tailwind/react'

import { formatVietnameseDong } from '~/utils/func'

export default function ProductComponent({
    img,
    name,
    price,
    description,
}: {
    img: string
    name: string
    price: number
    description: string
}) {
    return (
        <Card className='w-[300px] border-solid border-[1px]' shadow={false}>
            <CardHeader shadow={false} floated={false} className='h-[150px]'>
                <img
                    src={img}
                    alt={name}
                    className='h-full w-full object-cover'
                />
            </CardHeader>
            <CardBody>
                <div className='mb-2 flex items-center justify-between'>
                    <p className='line-clamp-1'>{name}</p>
                    <Typography color='blue-gray' className='font-medium'>
                        {formatVietnameseDong(price)}
                    </Typography>
                </div>
                <div
                    color='gray'
                    className='font-normal opacity-75 line-clamp-3'
                    dangerouslySetInnerHTML={{
                        __html: description,
                    }}
                />
            </CardBody>
            <CardFooter className='pt-0'>
                <Button
                    ripple={false}
                    fullWidth={true}
                    className='bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100'
                >
                    Mua
                </Button>
            </CardFooter>
        </Card>
    )
}

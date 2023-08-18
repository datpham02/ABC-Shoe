import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
type Product = {
    name: string
    description: string
    classify: Classify[]
    image: string[]
    status: string
    cost: number
    price: number
    categoryId: string
}
type Classify = {
    quantity: number
    size: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        try {
            const {
                name,
                description,
                image,
                status,
                cost,
                price,
                classify,
                categoryId,
            }: Product = req.body

            if (
                !(
                    name &&
                    description &&
                    status &&
                    cost &&
                    price &&
                    image &&
                    classify &&
                    categoryId
                )
            ) {
                return res.json({ msg: 'Thiếu dữ liệu !' })
            }

            const newProduct = await prisma.product.create({
                data: {
                    name,
                    description,
                    image,
                    status,
                    cost,
                    price,
                    classify: {
                        create: classify,
                    },
                    categoryId,
                },
            })

            if (newProduct) {
                return res.json({
                    msg: 'Thêm sản phẩm thành công !',
                    success: true,
                })
            } else
                return res.json({
                    msg: 'Thêm sản phẩm thất bại !',
                    success: false,
                })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

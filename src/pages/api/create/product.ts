import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
type Product = {
    name: string
    price: number
    cost: number
    description: string
    quantity: number
    image: string[]
    classify: Classify[]
    categoryId: string
}

type Classify = {
    name: string
    value: string[]
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        try {
            const {
                name,
                price,
                cost,
                description,
                quantity,
                image,
                classify,
                categoryId,
            }: Product = req.body

            if (
                !(
                    name &&
                    price &&
                    cost &&
                    description &&
                    quantity &&
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
                    price,
                    cost,
                    description,
                    quantity,
                    image,
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

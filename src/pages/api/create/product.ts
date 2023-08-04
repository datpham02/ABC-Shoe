import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
type Product = {
    name: string
    price: number
    description: string
    quantity: number
    image: string[]
    classify: Classify[]
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
                description,
                quantity,
                image,
                classify,
            }: Product = req.body

            if (
                !(name && price && description && quantity && image && classify)
            ) {
                return res.json({ msg: 'Thiếu dữ liệu !' })
            }

            const newProduct = await prisma.product.create({
                data: {
                    name,
                    price,
                    description,
                    quantity,
                    image,
                    classify: {
                        create: classify,
                    },
                },
            })

            if (newProduct) {
                return res.json({ msg: 'Thêm sản phẩm thành công !' })
            } else return res.json({ msg: 'Thêm sản phẩm thất bại !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

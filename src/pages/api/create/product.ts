import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        try {
            const { name, price, description, quantity, image, classify } =
                req.body

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
                        createMany: {
                            data: classify,
                        },
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

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            const { id, categoryId } = req.query
            if (id) {
                const product = await prisma.product.findUnique({
                    where: {
                        id: id as string,
                    },
                })

                if (product) {
                    return res.json({ product })
                } else return res.json({ msg: 'Không có dữ liệu !' })
            }
            if (categoryId) {
                const products = await prisma.product.findMany({
                    where: {
                        categoryId: categoryId as string,
                    },
                })
                if (products) {
                    return res.json({ products })
                } else return res.json({ msg: 'Thiếu dữ liệu !' })
            }
            return res.json({ msg: 'Yêu cầu không hợp lệ !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            const { id, all } = req.query

            if (id) {
                const category = await prisma.category.findUnique({
                    where: {
                        id: id as string,
                    },
                })

                if (category) {
                    return res.json({ category })
                } else return res.json({ msg: 'Không có dữ liệu !' })
            }
            if (all && all == 'true') {
                const categorys = await prisma.category.findMany()

                if (categorys) {
                    return res.json({ categorys })
                } else return res.json({ msg: 'Không có dữ liệu !' })
            }

            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

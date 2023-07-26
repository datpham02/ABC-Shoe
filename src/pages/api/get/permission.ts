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
                const permission = await prisma.permission.findUnique({
                    where: {
                        id: id as string,
                    },
                })

                if (permission) {
                    return res.json({ permission })
                } else return res.json({ msg: 'Không có dữ liệu !' })
            }
            if (all && all == 'true') {
                const permissions = await prisma.permission.findMany()

                if (permissions) {
                    return res.json({ permissions })
                } else return res.json({ msg: 'Không có dữ liệu !' })
            }

            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

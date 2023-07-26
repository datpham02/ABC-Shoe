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
                const role = await prisma.role.findUnique({
                    where: {
                        id: id as string,
                    },
                })

                if (role) {
                    return res.json({ role })
                } else return res.json({ msg: 'Không có dữ liệu !' })
            }
            if (all && all == 'true') {
                const roles = await prisma.role.findMany()

                if (roles) {
                    return res.json({ roles })
                } else return res.json({ msg: 'Không có dữ liệu !' })
            }

            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        try {
            const { name } = req.body

            if (!name) {
                return res.json({ msg: 'Thiếu dữ liệu !' })
            }
            const newRole = await prisma.role.create({
                data: {
                    name,
                },
            })

            if (newRole) {
                return res.json({ msg: 'Thêm vai trò thành công !' })
            } else return res.json({ msg: 'Thêm vai trò thất bại !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

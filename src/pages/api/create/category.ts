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
            const newPermission = await prisma.permission.create({
                data: {
                    name,
                },
            })

            if (newPermission) {
                return res.json({ msg: 'Thêm quyền thành công !' })
            } else return res.json({ msg: 'Thêm quyền thất bại !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
import { convertToSlug } from '~/utils/func'

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
            const newPermission = await prisma.category.create({
                data: {
                    name,
                    slug: convertToSlug(name),
                },
            })

            if (newPermission) {
                return res.json({ msg: 'Tạo danh mục mới thành công !' })
            } else return res.json({ msg: 'Tạo danh mục mới thất bại !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

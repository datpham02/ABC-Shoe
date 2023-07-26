import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'DELETE') {
        try {
            const { id } = req.query

            if (id) {
                if (Array.isArray(id)) {
                    const deletePermission = await prisma.permission.deleteMany(
                        {
                            where: {
                                id: {
                                    in: id,
                                },
                            },
                        },
                    )
                    if (deletePermission) {
                        return res.json({
                            msg: 'Xóa quyền thành công !',
                        })
                    } else
                        return res.json({
                            msg: 'Xóa quyền thất bại !',
                        })
                } else {
                    const deletePermission = await prisma.permission.deleteMany(
                        {
                            where: {
                                id: id,
                            },
                        },
                    )
                    if (deletePermission) {
                        return res.json({
                            msg: 'Xóa quyền thành công !',
                        })
                    } else
                        return res.json({
                            msg: 'Xóa quyền thất bại !',
                        })
                }
            }
            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

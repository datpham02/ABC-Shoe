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
                    const deleteRole = await prisma.role.deleteMany({
                        where: {
                            id: {
                                in: id,
                            },
                        },
                    })
                    if (deleteRole) {
                        return res.json({
                            msg: 'Xóa vai trò thành công !',
                        })
                    } else
                        return res.json({
                            msg: 'Xóa vai trò thất bại !',
                        })
                } else {
                    const deleteRole = await prisma.role.deleteMany({
                        where: {
                            id: id,
                        },
                    })
                    if (deleteRole) {
                        return res.json({
                            msg: 'Xóa vai trò thành công !',
                        })
                    } else
                        return res.json({
                            msg: 'Xóa vai trò thất bại !',
                        })
                }
            }
            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

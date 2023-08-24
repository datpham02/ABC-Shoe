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
                    const deleteCategory = await prisma.category.deleteMany({
                        where: {
                            id: {
                                in: id,
                            },
                        },
                    })
                    if (deleteCategory) {
                        return res.json({
                            msg: 'Xóa danh mục sản phẩm thành công !',
                        })
                    } else
                        return res.json({
                            msg: 'Xóa danh mục sản phẩm thất bại !',
                        })
                } else {
                    const deleteCategory = await prisma.category.delete({
                        where: {
                            id: id,
                        },
                    })
                    if (deleteCategory) {
                        return res.json({
                            msg: 'Xóa danh mục sản phẩm thành công !',
                        })
                    } else
                        return res.json({
                            msg: 'Xóa danh mục sản phẩm thất bại !',
                        })
                }
            }
            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

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
                    const deleteProduct = await prisma.product.deleteMany({
                        where: {
                            id: {
                                in: id,
                            },
                        },
                    })
                    if (deleteProduct) {
                        return res.json({ msg: 'Xóa sản phẩm thành công !' })
                    } else return res.json({ msg: 'Xóa sản phẩm thất bại !' })
                } else {
                    const deleteProduct = await prisma.product.deleteMany({
                        where: {
                            id: id,
                        },
                    })
                    if (deleteProduct) {
                        return res.json({ msg: 'Xóa sản phẩm thành công !' })
                    } else return res.json({ msg: 'Xóa sản phẩm thất bại !' })
                }
            }
            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

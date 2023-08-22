import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        const session = await getServerSession(req, res, authOptions)
        try {
            if (!session) {
                return res.json({
                    success: false,
                    msg: 'Bạn cần phải đăng nhập !',
                })
            }
            const { cartId, orderItemId } = req.body

            if (!(cartId && orderItemId))
                return res.json({ msg: 'Thiếu dữ liệu !', success: false })
            const cart = await prisma.cart.update({
                where: {
                    id: cartId as string,
                    userId: session.user.id,
                },
                data: {
                    cartItem: {
                        delete: {
                            id: orderItemId,
                        },
                    },
                },
            })
            return res.json({
                success: true,
                msg: 'Xóa sản phẩm thành công !',
                cart,
            })
        } catch (error) {
            return res
                .status(500)
                .json({ msg: 'Something went wrong !', error })
        }
    }
}

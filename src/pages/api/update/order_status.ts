import type { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import prisma from '~/lib/prisma'

type OrderItem = {
    productId: string
    quantity: number
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.json({
                msg: 'Bạn cần phải đăng nhập !',
                success: false,
            })
        }
        try {
            const {
                id,
                status,
            }: {
                id: string
                status: string
            } = req.body

            if (!id) {
                return res.json({ msg: 'Thiếu dữ liệu !' })
            }

            const update_order = await prisma.order.update({
                where: {
                    id: id,
                },
                data: {
                    status: status,
                },
                select: {
                    orderItem: true,
                },
            })
            const cart = await prisma.cart.findFirst({
                where: {
                    userId: session?.user.id,
                },
                select: {
                    id: true,
                    cartItem: true,
                },
            })

            const resetCart = await prisma.orderItem.deleteMany({
                where: {
                    id: {
                        in: cart?.cartItem.map((cartItem) => cartItem.id),
                    },
                },
            })
            const updateProduct = await Promise.all(
                update_order.orderItem.map((item) => {
                    return prisma.product.update({
                        where: {
                            id: item.productId,
                        },
                        data: {
                            quantity: {
                                decrement: item.quantity,
                            },
                        },
                    })
                }),
            )
            return res.json({
                success: true,
            })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

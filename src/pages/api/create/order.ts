import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import redis from '~/lib/redis'
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
                status,
                orderItem,
                total,
                addressId,
            }: {
                orderItem: OrderItem[]
                status: string
                total: number
                addressId: string
            } = req.body

            if (!(orderItem && status && total)) {
                return res.json({ msg: 'Thiếu dữ liệu !' })
            }

            const create_order = await prisma.order.create({
                data: {
                    userId: session.user.id,
                    status: status,
                    orderItem: {
                        create: orderItem,
                    },
                    total,
                    addressId,
                },
            })
            const cart = await prisma.cart.findFirst({
                where: {
                    userId: session.user.id,
                },
                select: {
                    cartItem: true,
                },
            })
            await Promise.all([
                prisma.cart.update({
                    where: {
                        userId: session.user.id,
                    },
                    data: {
                        cartItem: {
                            deleteMany: {
                                id: {
                                    in: cart?.cartItem.map(
                                        (cartItem) => cartItem.id,
                                    ),
                                },
                            },
                        },
                    },
                }),
                ...orderItem.map((item) => {
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
            ])
            return res.json({ success: true, create_order })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

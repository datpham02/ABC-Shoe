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

            if (!(orderItem && status && total && addressId)) {
                return res.json({ msg: 'Thiếu dữ liệu !' })
            }

            const create_order = await prisma.order.create({
                data: {
                    userId: session?.user.id as string,
                    status: status,
                    total: total,
                    addressId: addressId,
                    orderItem: {
                        create: orderItem,
                    },
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
                orderItem.map((item) => {
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

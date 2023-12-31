import type { NextApiRequest, NextApiResponse } from 'next'

import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        const session = await getServerSession(req, res, authOptions)
        try {
            if (!session) {
                return res.json({ msg: 'Bạn cần phải đăng nhập !' })
            }
            const cart = await prisma.cart.findFirst({
                where: {
                    userId: session.user.id,
                },
                select: {
                    id: true,
                    cartItem: {
                        select: {
                            id: true,
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                    price: true,
                                    size: true,
                                },
                            },
                            quantity: true,
                        },
                    },
                },
            })
            if (cart) {
                return res.json({ success: true, cart })
            }
            return res.json({ success: true, cart: [] })
        } catch (error) {
            return res
                .status(500)
                .json({ msg: 'Something went wrong !', error })
        }
    }
}

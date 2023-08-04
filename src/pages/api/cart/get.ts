import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
import redis from '~/lib/redis'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            const { id } = req.query

            if (!id) return res.json({ msg: 'Thiếu dữ liệu', success: false })
            const cart = await redis.hget('cart', id as string)

            const productIds: string[] = Object.keys(JSON.parse(cart as string))

            const [productInCart] = await Promise.all([
                prisma.product.findMany({
                    where: {
                        id: {
                            in: productIds,
                        },
                    },
                }),
            ])

            const handlCartData = productInCart.reduce((pre: any, cur: any) => {
                if (cur.quantity - JSON.parse(cart as string)[cur.id] >= 0) {
                    return [
                        ...pre,
                        {
                            product: cur,
                            quantity: JSON.parse(cart as string)[cur.id],
                        },
                    ]
                } else return [...pre]
            }, [])
            return res.json({ cart: handlCartData ?? [] })
        } catch (error) {
            return res
                .status(500)
                .json({ msg: 'Something went wrong !', error })
        }
    }
}

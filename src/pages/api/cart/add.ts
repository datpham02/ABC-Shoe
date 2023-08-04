import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '~/lib/redis'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        try {
            const { productId, quantity, userId } = req.body

            if (!(productId && quantity && userId)) {
                return res.json({ msg: 'Thiếu dữ liệu !', success: false })
            }
            const checkCart = await redis.hget('cart', userId)
            if (checkCart) {
                const cart = JSON.parse(checkCart)
                cart[productId] = quantity
                await redis.hset('cart', userId, JSON.stringify(cart))

                return res.json({
                    msg: 'Thêm sản phẩm vào giỏ hàng thành công ',
                    success: true,
                })
            } else {
                await redis.hset(
                    'cart',
                    userId,
                    JSON.stringify({ [productId]: quantity }),
                )
                return res.json({
                    msg: 'Thêm sản phẩm vào giỏ hàng thành công ',
                    success: true,
                })
            }
        } catch (error) {
            return res
                .status(500)
                .json({ msg: 'Something went wrong !', error })
        }
    }
}

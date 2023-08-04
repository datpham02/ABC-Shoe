import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '~/lib/redis'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'UPDATE') {
        try {
            const { userId, cart } = req.query

            if (!userId && cart)
                return res.json({ msg: 'Thiếu dữ liệu', success: false })
            await redis.hset('cart', userId as string, JSON.stringify(cart))
            return res.json({
                msg: 'Cập nhập giỏ hàng thành công',
                success: true,
            })
        } catch (error) {
            return res
                .status(500)
                .json({ msg: 'Something went wrong !', error })
        }
    }
}

import type { NextApiRequest, NextApiResponse } from 'next'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        try {
            const { productId, quantity, cartId } = req.body

            if (!(productId && quantity && cartId)) {
                return res.json({ msg: 'Thiếu dữ liệu !', success: false })
            }
            
           
        } catch (error) {
            return res
                .status(500)
                .json({ msg: 'Something went wrong !', error })
        }
    }
}

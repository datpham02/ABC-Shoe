import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            const quantity_order = await prisma.order.findMany()

            return res.json({
                success: true,
                statistics_order: {
                    quantity_order: quantity_order.length,
                },
                revenue:
                    quantity_order.length > 0
                        ? quantity_order.reduce((total, order) => {
                              return total + order.total
                          }, 0)
                        : 0,
            })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

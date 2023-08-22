import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            const [quantity_customer] = await Promise.all([
                prisma.user.findMany({
                    where: {
                        role: {
                            equals: 'customer',
                        },
                    },
                }),
            ])

            return res.json({
                success: true,
                statistics_customer: {
                    quantity_customer: quantity_customer.length,
                },
            })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

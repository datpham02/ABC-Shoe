import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        const currentDate = new Date()
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(currentDate.getDate() - 7)

        try {
            const [quantity_product, sold, product_sold_during_7day] =
                await Promise.all([
                    prisma.product.findMany({
                        select: {
                            parentProductId: true,
                        },
                    }),
                    prisma.order.findMany({
                        select: {
                            orderItem: true,
                        },
                    }),
                    prisma.order.findMany({
                        select: {
                            orderItem: true,
                        },
                        where: {
                            createAt: {
                                gte: sevenDaysAgo,
                                lte: currentDate,
                            },
                        },
                    }),
                ])

            return res.json({
                success: true,
                statistics_product: {
                    quantity_product: quantity_product.filter(
                        (product) => product.parentProductId == null,
                    ).length,
                    product_sold: sold.reduce((total_sold, order) => {
                        return (
                            total_sold +
                            order.orderItem.reduce(
                                (total_quantity, orderItem) => {
                                    return total_quantity + orderItem.quantity
                                },
                                0,
                            )
                        )
                    }, 0),
                },
            })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

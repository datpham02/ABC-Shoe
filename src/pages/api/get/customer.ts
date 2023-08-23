import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            const { id, all } = req.query

            if (id) {
                const customer = await prisma.user.findUnique({
                    where: {
                        id: id as string,
                        role: 'customer',
                    },
                })
                // const [customer, count_customer_buy] = await Promise.all([
                //     prisma.user.findUnique({
                //         where: {
                //             id: id as string,
                //             role: 'customer',
                //         },
                //     }),
                //     prisma.order.findMany({
                //         where: {
                //             customer: {
                //                 id: id as string,
                //             },
                //         },
                //     }),
                // ])

                if (customer) {
                    return res.json({
                        customer,
                    })
                } else return res.json({ msg: 'Không có dữ liệu !' })
            }
            if (all && all == 'true') {
                const customers = await prisma.user.findMany({
                    where: {
                        role: 'customer',
                    },
                    include: {
                        order: {
                            include: {
                                orderItem: {
                                    select: {
                                        product: {
                                            select: {
                                                id: true,
                                                name: true,
                                                description: true,
                                                price: true,
                                                image: true,
                                            },
                                        },
                                        quantity: true,
                                    },
                                },
                            },
                            where: {
                                status: 'Đã thanh toán',
                            },
                        },
                    },
                })

                if (customers) {
                    return res.json({ customers: customers ?? [] })
                } else return res.json({ msg: 'Không có dữ liệu !' })
            }

            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

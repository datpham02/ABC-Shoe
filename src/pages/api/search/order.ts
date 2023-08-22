import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            const { id, customer_name } = req.query
            if (id) {
                const searchResult = await prisma.order.findMany({
                    where: {
                        OR: [
                            {
                                id: {
                                    contains: id as string,
                                },
                            },
                            {
                                id: {
                                    equals: id as string,
                                    mode: 'insensitive',
                                },
                            },
                        ],
                    },
                    select: {
                        id: true,
                        customer: {
                            select: {
                                name: true,
                                email: true,
                                image: true,
                            },
                        },
                        createAt: true,
                        status: true,
                        total: true,
                        orderItem: {
                            select: {
                                product: {
                                    select: {
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
                return res.json({ success: true, orders: searchResult })
            }
            if (customer_name) {
                const searchResult = await prisma.order.findMany({
                    where: {
                        OR: [
                            {
                                customer: {
                                    name: {
                                        contains: customer_name as string,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                            {
                                customer: {
                                    name: {
                                        equals: customer_name as string,
                                        mode: 'insensitive',
                                    },
                                },
                            },
                        ],
                    },
                    select: {
                        id: true,
                        customer: {
                            select: {
                                name: true,
                                email: true,
                                image: true,
                            },
                        },
                        createAt: true,
                        status: true,
                        total: true,
                        orderItem: {
                            select: {
                                product: {
                                    select: {
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
                return res.json({ success: true, orders: searchResult })
            }

            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

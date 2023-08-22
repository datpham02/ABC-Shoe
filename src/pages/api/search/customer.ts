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
                const searchResult = await prisma.user.findMany({
                    where: {
                        OR: [
                            {
                                id: {
                                    contains: id as string,
                                },
                                role: 'customer',
                            },
                            {
                                id: {
                                    equals: id as string,
                                    mode: 'insensitive',
                                },
                                role: 'customer',
                            },
                        ],
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
                        },
                    },
                })
                return res.json({ success: true, customers: searchResult })
            }
            if (customer_name) {
                const searchResult = await prisma.user.findMany({
                    where: {
                        OR: [
                            {
                                name: {
                                    contains: customer_name as string,
                                },
                                role: 'customer',
                            },
                            {
                                name: {
                                    equals: customer_name as string,
                                    mode: 'insensitive',
                                },
                                role: 'customer',
                            },
                        ],
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
                        },
                    },
                })
                return res.json({ success: true, customers: searchResult })
            }

            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

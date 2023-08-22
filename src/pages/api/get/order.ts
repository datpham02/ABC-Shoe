import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            const { id, type } = req.query

            if (id) {
                const order = await prisma.order.findUnique({
                    where: {
                        id: id as string,
                    },
                    select: {
                        id: true,
                        status: true,
                        orderItem: {
                            select: {
                                product: {
                                    select: {
                                        id: true,
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

                if (order) {
                    return res.json({ order })
                } else return res.json({ msg: 'Không có dữ liệu !' })
            }
            if (type == 'tat-ca') {
                const orders = await prisma.order.findMany({
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
                return res.json({ success: true, orders })
            } else if (type == 'da-thanh-toan') {
                const orders = await prisma.order.findMany({
                    where: {
                        status: 'Đã thanh toán',
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
                return res.json({ success: true, orders })
            } else if (type == 'chua-thanh-toan') {
                const orders = await prisma.order.findMany({
                    where: {
                        status: 'Chưa thanh toán',
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
                return res.json({ success: true, orders })
            }

            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

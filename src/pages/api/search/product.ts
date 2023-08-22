import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            const { id, prduct_name } = req.query
            if (id) {
                const searchResult = await prisma.product.findMany({
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
                        parentProductId: true,
                        id: true,
                        name: true,
                        image: true,
                        cost: true,
                        price: true,
                        quantity: true,
                        size: true,
                        description: true,
                        createAt: true,
                        updateAt: true,
                        status: true,
                        productChild: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                cost: true,
                                price: true,
                                description: true,
                                createAt: true,
                                updateAt: true,
                                status: true,
                                category: {
                                    select: {
                                        name: true,
                                        id: true,
                                    },
                                },
                                size: true,
                                quantity: true,
                            },
                        },
                        category: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                })
                return res.json({
                    products: searchResult.filter(
                        (product) => product.parentProductId == null,
                    ),
                })
            }
            if (prduct_name) {
                const searchResult = await prisma.product.findMany({
                    where: {
                        OR: [
                            {
                                name: {
                                    contains: prduct_name as string,
                                },
                            },
                            {
                                name: {
                                    equals: prduct_name as string,
                                    mode: 'insensitive',
                                },
                            },
                        ],
                    },
                    select: {
                        parentProductId: true,
                        id: true,
                        name: true,
                        image: true,
                        cost: true,
                        price: true,
                        quantity: true,
                        size: true,
                        description: true,
                        createAt: true,
                        updateAt: true,
                        status: true,
                        productChild: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                cost: true,
                                price: true,
                                description: true,
                                createAt: true,
                                updateAt: true,
                                status: true,
                                category: {
                                    select: {
                                        name: true,
                                        id: true,
                                    },
                                },
                                size: true,
                                quantity: true,
                            },
                        },
                        category: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                })
                return res.json({
                    products: searchResult.filter(
                        (product) => product.parentProductId == null,
                    ),
                })
            }

            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

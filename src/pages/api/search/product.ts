import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            const { id, product_name } = req.query
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
                    products: searchResult,
                })
            }
            if (product_name) {
                const searchResult = await prisma.product.findMany({
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

                const temp = searchResult
                    .filter((product) => product.parentProductId == null)
                    .map((product, index) => {
                        if (
                            product.name
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '')
                                .toLowerCase()
                                .includes(
                                    (product_name as string)
                                        .normalize('NFD')
                                        .replace(/[\u0300-\u036f]/g, '')
                                        .toLowerCase(),
                                )
                        )
                            return product
                    })

                return res.json({
                    products: temp
                        .filter((product) => product != null)
                        .slice(0, 5),
                })
            }

            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

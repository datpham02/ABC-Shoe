import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            const { id, all, slug } = req.query

            if (id) {
                const category = await prisma.category.findUnique({
                    where: {
                        id: id as string,
                    },
                })

                if (category) {
                    return res.json({ category: category ?? [] })
                } else return res.json({ msg: 'Không có dữ liệu !' })
            }
            if (all && all == 'true') {
                const categorys = await prisma.category.findMany()

                if (categorys) {
                    return res.json({ categorys })
                } else return res.json({ msg: 'Không có dữ liệu !' })
            }
            if (slug) {
                const category = await prisma.category.findFirst({
                    where: {
                        slug: slug as string,
                    },
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        product: {
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
                                slug: true,
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
                        },
                    },
                })

                if (category) {
                    return res.json({
                        category:
                            {
                                ...category,
                                product: category.product.filter(
                                    (product) =>
                                        product.parentProductId == null,
                                ),
                            } ?? [],
                    })
                } else return res.json({ msg: 'Không có dữ liệu !' })
            }

            return res.json({ msg: 'Thiếu dữ liệu !' })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

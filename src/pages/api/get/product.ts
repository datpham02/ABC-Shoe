import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
import { convertToSlug } from '~/utils/func'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        try {
            const { id, categoryId, new_product, all, slug } = req.query
            if (id) {
                const product = await prisma.product.findUnique({
                    where: {
                        id: id as string,
                    },
                    select: {
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
                })

                if (product) {
                    return res.json({ product })
                } else
                    return res.json({
                        success: false,
                        msg: 'Không có dữ liệu !',
                    })
            }
            if (categoryId) {
                const [products, category] = await Promise.all([
                    prisma.product.findMany({
                        where: {
                            categoryId: categoryId as string,
                            status: {
                                equals: 'Đang hoạt động',
                            },
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
                    }),
                    prisma.category.findUnique({
                        where: {
                            id: categoryId as string,
                        },
                        select: {
                            id: true,
                            name: true,
                        },
                    }),
                ])

                if (products) {
                    return res.json({
                        products: products.filter(
                            (product) => product.parentProductId == null,
                        ),
                        category: category,
                    })
                } else
                    return res.json({ success: false, msg: 'Thiếu dữ liệu !' })
            }

            if (new_product == 'true') {
                const currentDate = new Date()
                currentDate.setDate(currentDate.getDate() - 7)
                const products = await prisma.product.findMany({
                    where: {
                        createAt: {
                            gte: currentDate.toISOString(),
                        },
                        status: {
                            equals: 'Đang hoạt động',
                        },
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
                })
                if (products) {
                    return res.json({
                        products: products.filter(
                            (product) => product.parentProductId == null,
                        ),
                    })
                } else
                    return res.json({ success: false, msg: 'Thiếu dữ liệu !' })
            }
            if (all == 'true') {
                const products = await prisma.product.findMany({
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
                })
                if (products) {
                    return res.json({
                        products: products.filter(
                            (product) => product.parentProductId == null,
                        ),
                    })
                } else
                    return res.json({ success: false, msg: 'Thiếu dữ liệu !' })
            }
            if (slug) {
                const product = await prisma.product.findFirst({
                    where: {
                        slug: slug as string,
                    },
                    select: {
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
                })

                if (product) {
                    return res.json({ product })
                } else
                    return res.json({
                        success: false,
                        msg: 'Không có dữ liệu !',
                    })
            }

            return res.json({
                success: false,
                msg: 'Yêu cầu không hợp lệ !',
            })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

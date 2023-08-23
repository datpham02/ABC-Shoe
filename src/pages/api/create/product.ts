import type { NextApiRequest, NextApiResponse } from 'next'

import { convertToSlug } from '~/utils/func'
import prisma from '~/lib/prisma'

type Product = {
    name: string
    description: string
    image: string[]
    status: string
    cost: number
    price: number
    size: string
    quantity: number
    categoryId: string
    productChild: Product[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        try {
            const {
                name,
                description,
                image,
                status,
                cost,
                price,
                quantity,
                size,
                productChild,
                categoryId,
            }: Product = req.body

            if (
                !(
                    name &&
                    description &&
                    status &&
                    cost &&
                    price &&
                    image &&
                    categoryId &&
                    quantity &&
                    size &&
                    productChild
                )
            ) {
                return res.json({ msg: 'Thiếu dữ liệu !' })
            }

            const newProduct = await prisma.product.create({
                data: {
                    name,
                    description,
                    image,
                    status,
                    cost,
                    price,
                    quantity,
                    size,
                    slug: convertToSlug(name),
                    productChild: {
                        create: productChild.map((child) => {
                            return {
                                name: child.name,
                                description: child.description,
                                image: child.image,
                                status: child.status,
                                cost: child.cost,
                                price: child.price,
                                quantity: child.quantity,
                                size: child.size,
                                slug: convertToSlug(child.name),
                                categoryId: child.categoryId,
                            }
                        }),
                    },
                    categoryId,
                },
            })

            if (newProduct) {
                return res.json({
                    msg: 'Thêm sản phẩm thành công !',
                    success: true,
                })
            } else {
                return res.json({
                    msg: 'Thêm sản phẩm thất bại !',
                    success: false,
                })
            }
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
import redis from '~/lib/redis'
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
type CartItem = {
    product: Product
    quantity: number
}

type Product = {
    id: string
    name: string
    img: string
    classify: {
        size: string
        id: string
    }
    price: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        const session = await getServerSession(req, res, authOptions)
        try {
            if (!session) {
                return res.json({ msg: 'Bạn cần phải đăng nhập !' })
            }
            const { cartItem }: { cartItem: CartItem; userId: string } =
                req.body

            if (!cartItem) {
                return res
                    .status(400)
                    .json({ msg: 'Thiếu dữ liệu !', success: false })
            }
            const checkProductQuantity = await prisma.classify.findUnique({
                where: {
                    productId: cartItem.product.id,
                    id: cartItem.product.classify.id,
                },
            })

            if (checkProductQuantity?.quantity) {
                if (checkProductQuantity?.quantity > 0) {
                    if (
                        checkProductQuantity?.quantity - cartItem.quantity >
                        0
                    ) {
                        const checkCart = await redis.hget(
                            'cart',
                            session?.user.id,
                        )
                        if (checkCart) {
                            const cart = JSON.parse(checkCart)

                            const new_cart = cart.map(
                                (cartItemData: CartItem) => {
                                    if (
                                        cartItemData.product.id ==
                                        cartItem.product.id
                                    ) {
                                        const new_cartItem = {
                                            ...cartItemData,
                                            quantity: cartItem.quantity,
                                        }
                                        return new_cartItem
                                    }
                                    return cartItemData
                                },
                            )
                            await redis.hset(
                                'cart',
                                session?.user.id,
                                JSON.stringify(new_cart),
                            )

                            return res.json({
                                msg: 'Thêm sản phẩm vào giỏ hàng thành công ',
                                success: true,
                            })
                        } else {
                            await redis.hset(
                                'cart',
                                session?.user.id,
                                JSON.stringify([cartItem]),
                            )
                            return res.json({
                                msg: 'Thêm sản phẩm vào giỏ hàng thành công ',
                                success: true,
                            })
                        }
                    } else {
                        const checkCart = await redis.hget(
                            'cart',
                            session?.user.id,
                        )
                        if (checkCart) {
                            const cart = JSON.parse(checkCart)

                            const new_cart = cart.map(
                                (cartItemData: CartItem) => {
                                    if (
                                        cartItemData.product.id ==
                                        cartItem.product.id
                                    ) {
                                        const new_cartItem = {
                                            ...cartItemData,
                                            quantity:
                                                checkProductQuantity.quantity,
                                        }
                                        return new_cartItem
                                    }
                                    return cartItemData
                                },
                            )
                            await redis.hset(
                                'cart',
                                session?.user.id,
                                JSON.stringify(new_cart),
                            )

                            return res.json({
                                msg: 'Thêm sản phẩm vào giỏ hàng thành công ',
                                success: true,
                            })
                        } else {
                            await redis.hset(
                                'cart',
                                session?.user.id,
                                JSON.stringify([
                                    {
                                        ...cartItem,
                                        quantity: checkProductQuantity.quantity,
                                    },
                                ]),
                            )
                            return res.json({
                                msg: 'Thêm sản phẩm vào giỏ hàng thành công ',
                                success: true,
                            })
                        }
                    }
                }
            }
            return res.json({ msg: 'Sản phẩm đã hết hàng !', success: false })
        } catch (error) {
            return res
                .status(500)
                .json({ msg: 'Something went wrong !', error })
        }
    }
}

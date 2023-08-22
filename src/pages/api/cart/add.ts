import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
type CartItem = {
    productId: string
    quantity: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.json({
                msg: 'Bạn cần phải đăng nhập !',
                success: false,
            })
        }
        try {
            const { cartItem }: { cartItem: CartItem } = req.body

            if (!cartItem) {
                return res
                    .status(400)
                    .json({ msg: 'Thiếu dữ liệu !', success: false })
            }

            const [checkProductQuantity, cartData] = await Promise.all([
                prisma.product.findUnique({
                    where: {
                        id: cartItem.productId,
                    },
                }),
                prisma.cart.findFirst({
                    where: {
                        userId: session?.user.id,
                    },
                }),
            ])

            if (!cartData) {
                const newCart = await prisma.cart.create({
                    data: {
                        userId: session.user.id,
                    },
                })
                if (checkProductQuantity?.quantity) {
                    if (checkProductQuantity?.quantity > 0) {
                        if (
                            checkProductQuantity?.quantity - cartItem.quantity >
                            0
                        ) {
                            const existingOrderItem =
                                await prisma.orderItem.findFirst({
                                    where: {
                                        productId: cartItem.productId,
                                        cartId: newCart?.id,
                                    },
                                })
                            if (existingOrderItem) {
                                const cart = await prisma.cart.update({
                                    where: {
                                        userId: session?.user.id,
                                        id: newCart?.id,
                                    },
                                    data: {
                                        cartItem: {
                                            update: {
                                                where: {
                                                    productId:
                                                        cartItem.productId,
                                                    id: existingOrderItem.id,
                                                },
                                                data: {
                                                    quantity: {
                                                        increment:
                                                            cartItem.quantity,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                })

                                return res.json({
                                    success: true,
                                    msg: 'Thêm sản phẩm vào giỏ hàng thành công !',
                                })
                            } else {
                                const cart = await prisma.cart.update({
                                    where: {
                                        userId: session?.user.id,
                                        id: newCart?.id,
                                    },
                                    data: {
                                        cartItem: {
                                            create: cartItem,
                                        },
                                    },
                                })

                                return res.json({
                                    success: true,
                                    msg: 'Thêm sản phẩm vào giỏ hàng thành công !',
                                })
                            }
                        } else {
                            const existingOrderItem =
                                await prisma.orderItem.findFirst({
                                    where: {
                                        productId: cartItem.productId,
                                        cartId: newCart?.id,
                                    },
                                })
                            if (existingOrderItem) {
                                const cart = await prisma.cart.update({
                                    where: {
                                        userId: session?.user.id,
                                        id: newCart?.id,
                                    },
                                    data: {
                                        cartItem: {
                                            update: {
                                                where: {
                                                    productId:
                                                        cartItem.productId,
                                                    id: existingOrderItem.id,
                                                },
                                                data: {
                                                    quantity:
                                                        checkProductQuantity.quantity,
                                                },
                                            },
                                        },
                                    },
                                })

                                return res.json({
                                    success: true,
                                    msg: 'Thêm sản phẩm vào giỏ hàng thành công !',
                                })
                            } else {
                                const cart = await prisma.cart.update({
                                    where: {
                                        userId: session?.user.id,
                                        id: newCart?.id,
                                    },
                                    data: {
                                        cartItem: {
                                            create: {
                                                quantity:
                                                    checkProductQuantity.quantity,
                                                productId: cartItem.productId,
                                            },
                                        },
                                    },
                                })

                                return res.json({
                                    success: true,
                                    msg: 'Thêm sản phẩm vào giỏ hàng thành công !',
                                })
                            }
                        }
                    }
                }
            }

            if (checkProductQuantity?.quantity) {
                if (checkProductQuantity?.quantity > 0) {
                    if (
                        checkProductQuantity?.quantity - cartItem.quantity >
                        0
                    ) {
                        const existingOrderItem =
                            await prisma.orderItem.findFirst({
                                where: {
                                    productId: cartItem.productId,
                                    cartId: cartData?.id,
                                },
                            })
                        if (existingOrderItem) {
                            const cart = await prisma.cart.update({
                                where: {
                                    userId: session?.user.id,
                                    id: cartData?.id,
                                },
                                data: {
                                    cartItem: {
                                        update: {
                                            where: {
                                                productId: cartItem.productId,
                                                id: existingOrderItem.id,
                                            },
                                            data: {
                                                quantity: {
                                                    increment:
                                                        cartItem.quantity,
                                                },
                                            },
                                        },
                                    },
                                },
                            })

                            return res.json({
                                success: true,
                                msg: 'Thêm sản phẩm vào giỏ hàng thành công !',
                            })
                        } else {
                            const cart = await prisma.cart.update({
                                where: {
                                    userId: session?.user.id,
                                    id: cartData?.id,
                                },
                                data: {
                                    cartItem: {
                                        create: cartItem,
                                    },
                                },
                            })

                            return res.json({
                                success: true,
                                msg: 'Thêm sản phẩm vào giỏ hàng thành công !',
                            })
                        }
                    } else {
                        const existingOrderItem =
                            await prisma.orderItem.findFirst({
                                where: {
                                    productId: cartItem.productId,
                                    cartId: cartData?.id,
                                },
                            })
                        if (existingOrderItem) {
                            const cart = await prisma.cart.update({
                                where: {
                                    userId: session?.user.id,
                                    id: cartData?.id,
                                },
                                data: {
                                    cartItem: {
                                        update: {
                                            where: {
                                                productId: cartItem.productId,
                                                id: existingOrderItem.id,
                                            },
                                            data: {
                                                quantity:
                                                    checkProductQuantity.quantity,
                                            },
                                        },
                                    },
                                },
                            })

                            return res.json({
                                success: true,
                                msg: 'Thêm sản phẩm vào giỏ hàng thành công !',
                            })
                        } else {
                            const cart = await prisma.cart.update({
                                where: {
                                    userId: session?.user.id,
                                    id: cartData?.id,
                                },
                                data: {
                                    cartItem: {
                                        create: {
                                            quantity:
                                                checkProductQuantity.quantity,
                                            productId: cartItem.productId,
                                        },
                                    },
                                },
                            })

                            return res.json({
                                success: true,
                                msg: 'Thêm sản phẩm vào giỏ hàng thành công !',
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

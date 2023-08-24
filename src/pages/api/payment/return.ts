import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
import crypto from 'crypto'
import querystring from 'qs'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
function sortObject(obj: any) {
    let sorted: any = {}
    let str = []
    let key
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key))
        }
    }
    str.sort()
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            '+',
        )
    }
    return sorted
}
type OrderItem = {
    productId: string
    quantity: number
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'GET') {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.json({
                msg: 'Bạn cần phải đăng nhập !',
                success: false,
            })
        }
        try {
            let vnp_Params = req.query

            let secureHash = vnp_Params['vnp_SecureHash']

            delete vnp_Params['vnp_SecureHash']
            delete vnp_Params['vnp_SecureHashType']

            vnp_Params = sortObject(vnp_Params)

            var tmnCode = process.env.NEXT_PUBLIC_VNP_TNMCODE
            var secretKey = process.env.NEXT_PUBLIC_VNP_HASHSECRET

            let signData = querystring.stringify(vnp_Params, { encode: false })

            let hmac = crypto.createHmac('sha512', secretKey as string)
            let signed = hmac
                .update(new Buffer(signData, 'utf-8'))
                .digest('hex')

            if (secureHash === signed) {
                const get_order = await prisma.order.findUnique({
                    where: {
                        id: vnp_Params['vnp_TxnRef'] as string,
                    },
                    select: {
                        orderItem: true,
                    },
                })
                if (!get_order)
                    return res.status(404).json({
                        success: false,
                        message: 'Đặt đơn hàng thất bại',
                    })
                const cart = await prisma.cart.findFirst({
                    where: {
                        userId: session?.user.id,
                    },
                    select: {
                        id: true,
                        cartItem: true,
                    },
                })

                const resetCart = await prisma.orderItem.deleteMany({
                    where: {
                        id: {
                            in: cart?.cartItem.map((cartItem) => cartItem.id),
                        },
                    },
                })
                const updateProduct = await Promise.all(
                    get_order.orderItem.map((item) => {
                        return prisma.product.update({
                            where: {
                                id: item.productId,
                            },
                            data: {
                                quantity: {
                                    decrement: item.quantity,
                                },
                            },
                        })
                    }),
                )
                const url =
                    process.env.NODE_ENV == 'production'
                        ? process.env.NEXT_PUBLIC_BASE_URL
                        : 'http://localhost:3000'
                window.location.replace(url as string)
            } else {
                const url =
                    process.env.NODE_ENV == 'production'
                        ? process.env.NEXT_PUBLIC_BASE_URL
                        : 'http://localhost:3000'
                window.location.replace(url as string)
            }
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

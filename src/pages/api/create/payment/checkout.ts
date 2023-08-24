import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
import crypto from 'crypto'
import querystring from 'qs'
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
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
            const { amount, orderInfoJson } = req.body

            const create_order = await prisma.order.create({
                data: {
                    userId: session?.user.id as string,
                    status: orderInfoJson?.status,
                    total: orderInfoJson?.total,
                    addressId: orderInfoJson?.addressId,
                    orderItem: {
                        create: orderInfoJson?.orderItem,
                    },
                },
            })
            const ipAddr =
                req.headers['x-forwarded-for'] || req.socket.remoteAddress

            const now = new Date()

            const year = now.getFullYear()
            const month = (now.getMonth() + 1).toString().padStart(2, '0')
            const day = now.getDate().toString().padStart(2, '0')
            const hours = now.getHours().toString().padStart(2, '0')
            const minutes = now.getMinutes().toString().padStart(2, '0')
            const seconds = now.getSeconds().toString().padStart(2, '0')

            const createDate = `${year}${month}${day}${hours}${minutes}${seconds}`
            var tmnCode = process.env.NEXT_PUBLIC_VNP_TNMCODE
            var secretKey = process.env.NEXT_PUBLIC_VNP_HASHSECRET
            var vnpUrl = process.env.NEXT_PUBLIC_VNP_URL
            var returnUrl =
                process.env.NODE_ENV == 'production'
                    ? 'https://abc-shoe.vercel.app/api/payment/return'
                    : 'http://localhost:3000/api/payment/return'

            var currCode = 'VND'
            var vnp_Params: any = {}
            vnp_Params['vnp_Version'] = '2.1.0'
            vnp_Params['vnp_Command'] = 'pay'
            vnp_Params['vnp_TmnCode'] = tmnCode

            vnp_Params['vnp_Locale'] = 'vn'
            vnp_Params['vnp_CurrCode'] = currCode
            vnp_Params['vnp_TxnRef'] = create_order.id
            vnp_Params[
                'vnp_OrderInfo'
            ] = `Thanh toan giao dich ${create_order.id}`
            vnp_Params['vnp_OrderType'] = 250000
            vnp_Params['vnp_Amount'] = amount * 100
            vnp_Params['vnp_ReturnUrl'] = returnUrl
            vnp_Params['vnp_IpAddr'] = ipAddr
            vnp_Params['vnp_CreateDate'] = createDate
            vnp_Params['vnp_BankCode'] = 'NCB'

            vnp_Params = sortObject(vnp_Params)
            var signData = querystring.stringify(vnp_Params, { encode: false })
            var hmac = crypto.createHmac('sha512', secretKey as string)
            var signed = hmac
                .update(new Buffer(signData, 'utf-8'))
                .digest('hex')
            vnp_Params['vnp_SecureHash'] = signed
            vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false })
            return res.json({
                redirect: vnpUrl,
                success: true,
            })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

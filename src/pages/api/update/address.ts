import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
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
            const { id, name, phone, location, address, isDefault } = req.body

            if (!(name && phone && location && address && isDefault)) {
                return res.json({ msg: 'Thiếu dữ liệu !' })
            }
            if (isDefault) {
                const [newAddress, update_all] = await Promise.all([
                    prisma.address.update({
                        where: {
                            id,
                        },
                        data: {
                            name,
                            phone,
                            address,
                            isDefault,
                            location,
                        },
                    }),
                    prisma.address.updateMany({
                        where: {
                            id: {
                                not: id,
                            },
                        },
                        data: {
                            isDefault: false,
                        },
                    }),
                ])
                const user_address = await prisma.user.findUnique({
                    where: {
                        id: session.user.id,
                    },
                    select: {
                        address: true,
                    },
                })
                if (newAddress) {
                    return res.json({
                        msg: 'Cập địa chỉ thành công !',
                        success: true,
                        address: user_address?.address,
                    })
                } else
                    return res.json({
                        msg: 'Cập địa chỉ thất bại !',
                        success: false,
                    })
            } else {
                const user_address = await prisma.user.findUnique({
                    where: {
                        id: session.user.id,
                    },
                    select: {
                        address: true,
                    },
                })
                const newAddress = await prisma.address.update({
                    where: {
                        id,
                    },
                    data: {
                        name,
                        phone,
                        address,
                        isDefault,
                        location,
                    },
                })
                if (newAddress) {
                    return res.json({
                        msg: 'Cập địa chỉ thành công !',
                        success: true,
                        address: user_address?.address,
                    })
                } else
                    return res.json({
                        msg: 'Cập địa chỉ thất bại !',
                        success: false,
                    })
            }
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

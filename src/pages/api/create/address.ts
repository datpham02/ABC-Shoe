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
            const { name, phone, location, address, isDefault } = req.body

            if (!(name && phone && location && address)) {
                return res.json({ msg: 'Thiếu dữ liệu !' })
            }

            const newAddress = await prisma.address.create({
                data: {
                    name,
                    phone,
                    address,
                    isDefault: isDefault ?? false,
                    location,
                    userId: session?.user.id,
                },
            })
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
                    msg: 'Thêm địa chỉ mới thành công !',
                    success: true,
                    address: user_address?.address,
                })
            } else
                return res.json({
                    msg: 'Thêm địa chỉ mới thất bại !',
                    success: false,
                })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

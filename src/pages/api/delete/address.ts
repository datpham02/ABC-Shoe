import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/prisma'
import { authOptions } from '~/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth/next'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'DELETE') {
        const session = await getServerSession(req, res, authOptions)
        if (!session) {
            return res.json({
                msg: 'Bạn cần phải đăng nhập !',
                success: false,
            })
        }
        try {
            const { id } = req.query

            if (id) {
                await prisma.address.delete({
                    where: {
                        id: id as string,
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
                return res.json({
                    msg: 'Xóa địa chỉ thành công !',
                    success: true,
                    address: user_address?.address,
                })
            }
            return res.json({ msg: 'Thiếu dữ liệu !', success: false })
        } catch (error) {
            return res.status(500).json({ msg: 'Đã xảy ra sự cố !', error })
        }
    }
}

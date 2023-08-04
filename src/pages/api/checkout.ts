import type { NextApiRequest, NextApiResponse } from 'next'
import stripe from '~/lib/stripe'

type Product = {
    name: string
    price: number
    description: string
    quantity: number
    image: string[]
    classify: Classify[]
}
type Classify = {
    name: string
    value: string[]
}

type CartItem = {
    product: Product
    quantity: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method == 'POST') {
        try {
            const { cart }: { cart: CartItem[] } = req.body

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `${process.env.NEXTAUTH_URL}/checkout/success`,
                cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
                line_items: cart.map((cart_item: CartItem) => {
                    return {
                        price_data: {
                            currency: 'vnd',
                            product_data: {
                                name: cart_item.product.name,
                                images: cart_item.product.image,
                            },
                            unit_amount: cart_item.product.price,
                        },
                        quantity: Number(cart_item.quantity),
                    }
                }),
            })

            return res.json({ session: session.url })
        } catch (error) {
            return res
                .status(500)
                .json({ msg: 'Something went wrong !', error })
        }
    }
}

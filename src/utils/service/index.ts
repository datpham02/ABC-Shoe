import axios from 'axios'
import { PurchaseUnit } from '../interface'

export const Paypal = {
    getAuthenticationTokenPayPal: async () => {
        const {
            data,
        }: {
            data: {
                scope: string
                access_token: string
                token_type: string
                app_id: string
                expires_in: number
                nonce: string
            }
        } = await axios.post(
            'https://api.paypal.com/v1/oauth2/token',
            {
                grant_type: 'client_credentials',
            },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                    username: process.env
                        .NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
                    password: process.env.NEXT_PUBLIC_PAYPAL_SECRET as string,
                },
            },
        )

        return data
    },
    createOrder: async (
        token: string,
        intent: string,
        purchase_units: PurchaseUnit,
    ) => {
        const { data } = await axios.post(
            'https://api.paypal.com/v2/checkout/orders',
            {
                intent: intent,
                purchase_units: [
                    {
                        amount: purchase_units.amount,
                        items: purchase_units.items,
                    },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        )
        return data
    },
}

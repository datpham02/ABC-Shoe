import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '~/lib/prisma'
import { Adapter } from 'next-auth/adapters'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_ID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET as string,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
        signIn: '/login',
    },
    adapter: PrismaAdapter(prisma) as Adapter,
    callbacks: {
        async session({ session, user, token }) {
            return {
                ...session,
                user,
                token,
            }
        },
    },
}

export default NextAuth(authOptions)

import { createContext } from 'react'
type UserInfoContextType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    image: string | null
}

export const UserInfoContext = createContext<UserInfoContextType | null>(null)

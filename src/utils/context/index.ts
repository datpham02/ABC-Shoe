import { createContext } from 'react'
import { AuthenticationPaypalResponse } from '../interface'

export const AuthenticationPaypalTokenContext =
    createContext<null | AuthenticationPaypalResponse>(null)

import React, { CSSProperties, MouseEventHandler } from 'react'

export interface HeaderItem {
    name: string
    href: string | null
    item: string[]
}

export interface SliderComponent {
    children: React.ReactNode
    settings: any
    className?: string
}
export interface ProductGridComponent {
    children: React.ReactNode
}
export interface PathComponent {
    data: { name: string; href: string }[]
    className?: string
}
export interface SizeComponent {
    data: string[]
}

export interface LoginData {
    email: string
    password: string
}
export interface AddressComponent {
    className?: string
    handlShowAddressSetting: () => void
}
export interface RadioComponent {
    className?: string
    checked: Boolean
}

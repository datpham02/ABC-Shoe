import React from 'react'

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


export interface LoginData {
    email: string
    password: string
}
export interface RegisterData {
    email: string
    password: string
    confirm_password: string
}
export interface SubscribeData {
    email: string
}

export interface AddressComponent {
    className?: string
    handlShowAddressSetting: () => void
}
export interface RadioComponent {
    className?: string
    checked: Boolean
}
export interface StoreLayout {
    children: React.ReactNode
}
export interface StoreLauoutSideBar {
    className?: string
}

export interface EditorComponent {
    value: string
    onChange: () => void
    error: any
    className?: string
}
export interface ClassifyComponent {
    className?: string
}
export interface SubscribeFormComponent {
    status: string
    submit: (data: { EMAIL: string }) => void
    className?: string
}

export interface StoreSideBarComponent {
    className: string
}

export interface InputTagComponent {
    tags: string[]
}

export interface Classify {
    name: string
    value: string[]
}
export interface ProductData {
    name: string
    cost: number
    price: number
    description: string
    classify: ClassifyData[]
    image: string[]
    status: string
    categoryId: string
}

export interface ProductChild {
    price: number
    cost: number
    quantity: number
    size: string
}
export interface Required {
    value: boolean
    message: string
}
export interface InputComponent {
    name: string
    onChange: () => void
    error: any
    className?: string
}
export interface AddCategory {
    onClose: () => void
}
export interface ClassifyData {
    quantity: number
    size: string
}

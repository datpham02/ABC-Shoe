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
export interface SizeComponent {
    data: string[]
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
export interface ClassifyItemComponent {
    index: number
    className?: string
    onRemove: (indexClassify: number) => void
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
export interface Product {
    name: string
    price: number
    cost: number
    description: string
    quantity: number
    image: string[]
    classify: Classify[]
    categoryId: string
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

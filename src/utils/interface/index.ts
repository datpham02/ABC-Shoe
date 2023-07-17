import React, { CSSProperties, MouseEventHandler } from 'react'

export interface HeaderItem {
    name: string
    item: string[]
}
export interface ArrowProps {
    className?: string
    style?: CSSProperties
    onClick?: MouseEventHandler
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
    data: string[]
    className: string
}
export interface SizeComponent {
    data: string[]
}

import { CSSProperties, MouseEventHandler } from 'react'

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
    className: string
}

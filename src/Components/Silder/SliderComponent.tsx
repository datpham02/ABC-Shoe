import React from 'react'
import Slider from 'react-slick'
import { twMerge } from 'tailwind-merge'
import { SliderComponent as SliderComponentType } from '~/utils/interface'
const SliderComponent = ({
    children,
    settings,
    className,
}: SliderComponentType) => {
    return (
        <Slider {...settings} className={twMerge(className)}>
            {children}
        </Slider>
    )
}

export default SliderComponent

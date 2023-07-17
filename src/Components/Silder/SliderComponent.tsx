import React from 'react'
import Slider from 'react-slick'
import { SliderComponent } from '~/utils/interface'
const SliderComponent = ({
    children,
    settings,
    className,
}: SliderComponent) => {
    return (
        <Slider {...settings} className={className}>
            {children}
        </Slider>
    )
}

export default SliderComponent

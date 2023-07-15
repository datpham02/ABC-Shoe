import React from 'react'
import Slider from 'react-slick'
import { SliderComponent } from '~/utils/interface'
const SliderComponent = ({ children, className }: SliderComponent) => {
    const settings = {
        infinite: true,
        speed: 1000,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    return (
        <Slider {...settings} className={className}>
            {children}
        </Slider>
    )
}

export default SliderComponent

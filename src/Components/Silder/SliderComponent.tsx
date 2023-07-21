import React from "react";
import Slider from "react-slick";
import { SliderComponent as SliderComponentType } from "~/utils/interface";
const SliderComponent = ({
  children,
  settings,
  className,
}: SliderComponentType) => {
  return (
    <Slider {...settings} className={className}>
      {children}
    </Slider>
  );
};

export default SliderComponent;

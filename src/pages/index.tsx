import dynamic from "next/dynamic";
import { ProductComponent } from "~/Components";
import ProductGridComponent from "~/Components/Grid/ProductGridComponent";

const SliderComponent = dynamic(
  () => import("../Components/Silder/SliderComponent"),
  { ssr: false }
);

export default function Home() {
  const settingSlider = {
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex flex-col">
      <SliderComponent settings={settingSlider} className="flex">
        <div className="outline-none h-[600px] w-full">
          <img
            alt={`home`}
            className="w-full h-full object-cover"
            src="https://theme.hstatic.net/200000384421/1000955298/14/home_slider_image_1.jpg?v=23"
          />
        </div>
        <div className="outline-none h-[600px] w-full">
          <img
            alt={`home`}
            className="w-full h-full object-cover"
            src="https://theme.hstatic.net/200000384421/1000955298/14/home_slider_image_2.jpg?v=23"
          />
        </div>
        <div className="outline-none h-[600px] w-full">
          <img
            alt={`home`}
            className="w-full h-full object-cover"
            src="https://theme.hstatic.net/200000384421/1000955298/14/home_slider_image_3.jpg?v=23"
          />
        </div>
        <div className="outline-none h-[600px] w-full">
          <img
            alt={`home`}
            className="w-full h-full object-cover"
            src="https://theme.hstatic.net/200000384421/1000955298/14/home_slider_image_4.jpg?v=23"
          />
        </div>
      </SliderComponent>
      <div className="px-[150px] mt-[20px] flex flex-col space-y-4">
        <div className="flex justify-center items-center">
          <span className="text-[30px]">Sản Phẩm Mới</span>
        </div>
        <ProductGridComponent>
          <ProductComponent />
          <ProductComponent />
          <ProductComponent />
          <ProductComponent />
          <ProductComponent />
          <ProductComponent />
          <ProductComponent />
        </ProductGridComponent>
      </div>
    </div>
  );
}

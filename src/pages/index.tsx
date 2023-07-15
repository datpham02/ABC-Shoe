import { HeaderComponent, SliderComponent } from '~/Components'

export default function Home() {
    return (
        <div className='flex flex-col'>
            <HeaderComponent />
            <SliderComponent className='flex'>
                <div className='outline-none h-[600px] w-full'>
                    <img
                        className='w-full h-full object-cover'
                        src='https://theme.hstatic.net/200000384421/1000955298/14/home_slider_image_1.jpg?v=23'
                    />
                </div>
                <div className='outline-none h-[600px] w-full'>
                    <img
                        className='w-full h-full object-cover'
                        src='https://theme.hstatic.net/200000384421/1000955298/14/home_slider_image_2.jpg?v=23'
                    />
                </div>
                <div className='outline-none h-[600px] w-full'>
                    <img
                        className='w-full h-full object-cover'
                        src='https://theme.hstatic.net/200000384421/1000955298/14/home_slider_image_3.jpg?v=23'
                    />
                </div>
                <div className='outline-none h-[600px] w-full'>
                    <img
                        className='w-full h-full object-cover'
                        src='https://theme.hstatic.net/200000384421/1000955298/14/home_slider_image_4.jpg?v=23'
                    />
                </div>
            </SliderComponent>
        </div>
    )
}

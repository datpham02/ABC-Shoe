import '~/styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { AppProps } from 'next/app'
import { HeaderComponent } from '~/Components'
//@ts-ignore
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className='flex flex-col'>
            <HeaderComponent />
            <div className='mt-[80px]'>
                <Component {...pageProps} />
            </div>
            <TawkMessengerReact
                propertyId='64b9eed294cf5d49dc64e859'
                widgetId='1h5r4pps6'
            />
        </div>
    )
}

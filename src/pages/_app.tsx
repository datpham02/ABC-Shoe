import '~/styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-quill/dist/quill.snow.css'
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
                propertyId={process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}
                widgetId={process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}
            />
        </div>
    )
}

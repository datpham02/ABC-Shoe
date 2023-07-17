import '~/styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { AppProps } from 'next/app'
import { HeaderComponent } from '~/Components'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <div className='flex flex-col'>
            <HeaderComponent />
            <Component {...pageProps} />
        </div>
    )
}

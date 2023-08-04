import '~/styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-quill/dist/quill.snow.css'
import type { AppProps, AppType } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { FooterComponent, HeaderComponent } from '~/Components'
//@ts-ignore
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import { Session } from 'next-auth'

const App: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) => {
    return (
        <SessionProvider session={session}>
            <div className='flex flex-col'>
                <HeaderComponent />
                <div className='mt-[80px]'>
                    <Component {...pageProps} />
                </div>
                <FooterComponent />
                <TawkMessengerReact
                    propertyId={process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID}
                    widgetId={process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}
                />
                <Toaster position='top-right' />
            </div>
        </SessionProvider>
    )
}
export default App

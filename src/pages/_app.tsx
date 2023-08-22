import '~/styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-quill/dist/quill.snow.css'
import type { AppProps, AppType } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { FooterComponent, HeaderComponent } from '~/Components'
import { ThemeProvider } from '@material-tailwind/react'
import { Session } from 'next-auth'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from '~/lib/use_query'

//@ts-ignore
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import NextProgress from 'next-progress'
import Script from 'next/script'

const App: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) => {
    return (
        <SessionProvider session={session}>
            <NextProgress color='#000' options={{ showSpinner: false }} />
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <Script
                        strategy='afterInteractive'
                        src='https://www.googletagmanager.com/gtag/js?id=G-VRZDT0KMJQ'
                    />
                    <Script>
                        {` window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-VRZDT0KMJQ');`}
                    </Script>

                    <div className='flex flex-col'>
                        <HeaderComponent />
                        <div className='mt-[80px]'>
                            <Component {...pageProps} />
                        </div>
                        <FooterComponent />
                        <TawkMessengerReact
                            propertyId={
                                process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID
                            }
                            widgetId={process.env.NEXT_PUBLIC_TAWK_WIDGET_ID}
                        />
                        <Toaster position='top-right' />
                    </div>
                </QueryClientProvider>
            </ThemeProvider>
        </SessionProvider>
    )
}
export default App

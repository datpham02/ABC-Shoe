import '~/styles/globals.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'react-quill/dist/quill.snow.css'

import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import NextProgress from 'next-progress'
import type { AppProps, AppType } from 'next/app'
import Script from 'next/script'
import { Toaster } from 'react-hot-toast'
import { FooterComponent, HeaderComponent } from '~/Components'
import queryClient from '~/lib/use_query'

import { ThemeProvider } from '@material-tailwind/react'
import { QueryClientProvider } from '@tanstack/react-query'
//@ts-ignore
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'

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

                    <div id='fb-root'></div>

                    <div
                        id='fb-customer-chat'
                        className='fb-customerchat'
                    ></div>
                    <Script strategy='afterInteractive'>
                        {`
                            window.fbAsyncInit = function() {
                                FB.init({
                                xfbml            : true,
                                version          : 'v17.0'
                                });
                            };

                            (function(d, s, id) {
                                var js, fjs = d.getElementsByTagName(s)[0];
                                if (d.getElementById(id)) return;
                                js = d.createElement(s); js.id = id;
                                js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
                                fjs.parentNode.insertBefore(js, fjs);
                            }(document, 'script', 'facebook-jssdk'));`}
                    </Script>
                    <Script>
                        {`
                        var chatbox = document.getElementById('fb-customer-chat');
                        chatbox.setAttribute("page_id", "113315805198292");
                        chatbox.setAttribute("attribution", "biz_inbox");`}
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

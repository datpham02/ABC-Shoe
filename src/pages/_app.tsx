import "~/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { AppProps } from "next/app";
import { HeaderComponent } from "~/Components";
// import dynamic from "next/dynamic";

// const TawkMessengerReact = dynamic(
//   // @ts-ignore
//   () => import("@tawk.to/tawk-messenger-react"),
//   { ssr: false }
// );

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col">
      <HeaderComponent />
      <Component {...pageProps} />
      {/* <TawkMessengerReact
        // @ts-ignore
        propertyId="64b9eed294cf5d49dc64e859"
        widgetId="1h5r4pps6"
      /> */}
    </div>
  );
}

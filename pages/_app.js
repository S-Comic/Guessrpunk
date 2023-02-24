import '@/styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false
import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';



export default function App({ Component, pageProps }) {
  
  return(
    <>
    <Component {...pageProps} />
    <Analytics />
    </>
  ) 
}

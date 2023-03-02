import '@/styles/globals.css'
// photosphere CSS has to be imported globally
import '@/styles/photosphere.css'
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

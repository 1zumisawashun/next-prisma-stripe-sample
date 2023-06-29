import { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'
import { SessionProvider } from 'next-auth/react'
import * as config from '../functions/constants/config'
import { RouteProvider } from '../routers/RouteProvider'
import { Header } from '../components/layouts/Header'
import '@/styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      {/* @ts-expect-error Server Component */}
      <RouteProvider>
        <CartProvider
          cartMode="checkout-session"
          stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
          currency={config.CURRENCY}
        >
          <Header />
          <Component {...pageProps} />
        </CartProvider>
      </RouteProvider>
    </SessionProvider>
  )
}

export default MyApp

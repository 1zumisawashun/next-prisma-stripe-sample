import { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'
import { SessionProvider } from 'next-auth/react'
import * as config from '../functions/constants/config'
import { RouteProvider } from '../routers/RouteProvider'
import { Header } from '../components/layouts/Header'
import '@/styles/globals.css'

export default function page({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* @ts-expect-error Server Component */}
      <RouteProvider>
        <CartProvider
          mode="payment"
          cartMode="client-only"
          currency="JPY"
          stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
          successUrl="http://localhost:3000/success"
          cancelUrl="http://localhost:3000"
        >
          <Header />
          <Component {...pageProps} />
        </CartProvider>
      </RouteProvider>
    </SessionProvider>
  )
}

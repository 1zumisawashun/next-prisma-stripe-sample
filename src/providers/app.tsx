import { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'
import { SessionProvider } from 'next-auth/react'
import { RouteProvider } from '../routers/RouteProvider'

export const AppProvider = ({
  pageProps,
  children
}: {
  pageProps: AppProps['pageProps']
  children: React.ReactNode
}) => {
  return (
    <SessionProvider session={pageProps.session}>
      {/* @ts-expect-error Server Component */}
      <RouteProvider>
        <CartProvider
          mode="payment"
          cartMode="client-only"
          currency="JPY"
          stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
          successUrl="http://localhost:3000/cart/thankyou"
          cancelUrl="http://localhost:3000"
        >
          {children}
        </CartProvider>
      </RouteProvider>
    </SessionProvider>
  )
}

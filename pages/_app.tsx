import { AppProps } from 'next/app'
import { CartProvider } from 'use-shopping-cart'
import * as config from '../functions/constants/config'
import '../styles.css'
import '../globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CartProvider
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string}
      currency={config.CURRENCY}
    >
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp

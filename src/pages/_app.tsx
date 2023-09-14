import { AppProps } from 'next/app'
import { Header } from '@/components/layouts/Header'
import { AppProvider } from '@/providers/app'
import '@/assets/styles/globals.css'

export default function page({ Component, pageProps }: AppProps) {
  return (
    <AppProvider pageProps={pageProps}>
      <Header />
      <Component {...pageProps} />
    </AppProvider>
  )
}

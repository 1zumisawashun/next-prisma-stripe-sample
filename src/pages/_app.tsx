import { AppProps } from 'next/app'
import { Header } from '@/components/layouts/Header/Header'
import { AppProvider } from '@/providers/app'
import '@/assets/styles/app.scss'

export default function page({ Component, pageProps }: AppProps) {
  return (
    <AppProvider pageProps={pageProps}>
      <Header />
      <Component {...pageProps} />
    </AppProvider>
  )
}

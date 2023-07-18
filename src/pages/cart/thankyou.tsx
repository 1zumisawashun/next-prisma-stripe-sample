import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Layout } from '@/components/layouts/Layout'
import { fetchGetJSON } from '@/functions/helpers/api-helpers'

const Page: NextPage = () => {
  const router = useRouter()

  // Fetch CheckoutSession from static page via https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/stripe/checkout_sessions/retrieve/${router.query.session_id}`
      : null,
    fetchGetJSON
  )

  if (error) return <div>failed to load</div>

  // NOTE:ここにリダイレクトされないのはsrc/pages/_app.tsxのcartProviderが原因かもしれない
  return (
    <Layout title="Checkout Payment Result | Next.js + TypeScript Example">
      <div>
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
        <h3>CheckoutSession response:</h3>
      </div>
    </Layout>
  )
}

export default Page

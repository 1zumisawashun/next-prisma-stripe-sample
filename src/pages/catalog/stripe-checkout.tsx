import { NextPage } from 'next'
import CheckoutForm from '../../features/stripeCheckout/CheckoutForm'
import { Layout } from '@/components/layouts/Layout'

const DonatePage: NextPage = () => {
  return (
    <Layout title="Donate with Checkout | Next.js + TypeScript Example">
      <div className="container mx-auto px-6 py-16">
        <CheckoutForm />
      </div>
    </Layout>
  )
}

export default DonatePage

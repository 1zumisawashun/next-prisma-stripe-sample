import { NextPage } from 'next'
import { Layout } from '@/components/layouts/Layout'

import CheckoutForm from '../../components/CheckoutForm'

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

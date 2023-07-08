import CheckoutForm from '../../features/catalog/components/CheckoutForm'
import { Layout } from '@/components/layouts/Layout'

export default function page() {
  return (
    <Layout title="Donate with Checkout | Next.js + TypeScript Example">
      <div className="container mx-auto px-6 py-16">
        <CheckoutForm />
      </div>
    </Layout>
  )
}

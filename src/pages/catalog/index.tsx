import Link from 'next/link'
import { Layout } from '@/components/layouts/Layout'

export default function page() {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="container mx-auto px-6 py-16">
        <ul className="grid grid-cols-2 justify-center gap-2">
          <li className="block w-1/2 bg-blue-200">
            <Link href="/catalog/stripe-checkout">
              <h2>Stripe with Checkout</h2>
              <img
                src="/checkout-one-time-payments.svg"
                className="h-auto max-w-full rounded-lg"
                alt=""
              />
            </Link>
          </li>
          <li className="block w-10/12">
            <Link href="/catalog/stripe-elements">
              <h2>Stripe with Elements</h2>
              <img
                src="/elements-card-payment.svg"
                className="h-auto max-w-full rounded-lg"
                alt=""
              />
            </Link>
          </li>
          <li className="block w-1/2">
            <Link href="/catalog/use-shopping-cart">
              <h2>Use Shopping Cart</h2>
              <img
                src="/use-shopping-cart.png"
                className="h-auto max-w-full rounded-lg"
                alt=""
              />
            </Link>
          </li>
        </ul>
      </div>
    </Layout>
  )
}

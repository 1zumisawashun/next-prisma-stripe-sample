import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'

const IndexPage: NextPage = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <ul className="card-list">
        <li>
          <Link
            href="/donate-with-checkout"
            className="card checkout-style-background"
          >
            <h2 className="bottom">Donate with Checkout</h2>
            <img src="/checkout-one-time-payments.svg" alt="" />
          </Link>
        </li>
        <li>
          <Link
            href="/donate-with-elements"
            className="card elements-style-background"
          >
            <h2 className="bottom">Donate with Elements</h2>
            <img src="/elements-card-payment.svg" alt="" />
          </Link>
        </li>
        <li>
          <Link
            href="/use-shopping-cart"
            className="card cart-style-background"
          >
            <h2 className="bottom">Use Shopping Cart</h2>
            <img src="/use-shopping-cart.png" alt="" />
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export default IndexPage

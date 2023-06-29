import Link from 'next/link'
import Image from 'next/image'
import { Layout } from '../../components/layouts/Layout'

const Catalog = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <ul className="card-list">
        <li>
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
        </li>
        <li>
          <Link
            href="/catalog/stripe-checkout"
            className="card checkout-style-background"
          >
            <h2 className="bottom">Donate with Checkout</h2>
            <Image
              src="/checkout-one-time-payments.svg"
              width={150}
              height={150}
              objectFit="contain"
              alt=""
            />
          </Link>
        </li>
        <li>
          <Link
            href="/catalog/stripe-elements"
            className="card elements-style-background"
          >
            <h2 className="bottom">Donate with Elements</h2>
            <Image
              src="/elements-card-payment.svg"
              width={150}
              height={150}
              objectFit="contain"
              alt=""
            />
          </Link>
        </li>
        <li>
          <Link
            href="/catalog/use-shopping-cart"
            className="card cart-style-background"
          >
            <h2 className="bottom">Use Shopping Cart</h2>
            <Image
              src="/use-shopping-cart.png"
              width={150}
              height={150}
              objectFit="contain"
              alt=""
            />
          </Link>
        </li>
      </ul>
    </Layout>
  )
}

export default Catalog

import { NextPage, GetServerSideProps } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const host = context.req.headers.host || 'localhost:3000'
    const protocol = /^localhost/.test(host) ? 'http' : 'https'
    console.log(`${protocol}://${host}/api/products`)
    const products = await fetch(`${protocol}://${host}/api/products`).then(
      (data) => data.json()
    )
    return {
      props: {
        products
      }
    }
  } catch (e) {
    console.log(e)
    return {
      props: {
        products: []
      }
    }
  }
}

const IndexPage: NextPage = (props) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <ul className="card-list">
        <li>
          <pre>
            <code>{JSON.stringify(props, null, 2)}</code>
          </pre>
        </li>
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

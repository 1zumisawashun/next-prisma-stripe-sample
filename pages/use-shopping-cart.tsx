import { NextPage } from 'next'
import { Layout } from '../components/layouts/Layout'
import CartSummary from '../components/CartSummary'
import Products from '../components/Products'

const DonatePage: NextPage = () => {
  return (
    <Layout title="Shopping Cart | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Shopping Cart</h1>
        <p>
          Powered by the{' '}
          <a href="https://useshoppingcart.com">use-shopping-cart</a> React
          hooks library.
        </p>
        <CartSummary />
        <Products />
      </div>
    </Layout>
  )
}

export default DonatePage

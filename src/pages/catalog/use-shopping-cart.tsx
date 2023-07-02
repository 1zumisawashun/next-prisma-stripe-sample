import { Layout } from '@/components/layouts/Layout'
import CartSummary from '@/features/useShoppingCart/CartSummary'
import Products from '@/features/useShoppingCart/Products'

export default function page() {
  return (
    <Layout title="Shopping Cart | Next.js + TypeScript Example">
      <div className="container mx-auto px-6 py-16">
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

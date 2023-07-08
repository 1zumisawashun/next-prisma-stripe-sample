import { NextPage, GetServerSideProps } from 'next'
import { Layout } from '@/components/layouts/Layout'
import { CartSummary, CartProductList } from '@/features/cart'

export default function page(props: NextPage) {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <CartSummary />
      <CartProductList />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const host = context.req.headers.host || 'localhost:3000'
    const protocol = /^localhost/.test(host) ? 'http' : 'https'
    console.log(`${protocol}://${host}/api/products`)
    const products = await fetch(
      `${protocol}://${host}/api/stripe/products/list`
    ).then((data) => data.json())
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

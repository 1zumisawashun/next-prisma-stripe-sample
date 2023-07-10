import { NextPage, GetServerSideProps } from 'next'
import { useShoppingCart } from 'use-shopping-cart'
import { Layout } from '@/components/layouts/Layout'
import { CartProductTable } from '@/features/cart'
import { ButtonLink } from '@/components/uis'

// NOTE:next-pageにするとフロントにコンソールが出るのか？
const Page: NextPage = (props) => {
  const { cartCount, formattedTotalPrice, cartDetails } = useShoppingCart()

  const posts = Object.values(cartDetails ?? [])

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="container mx-auto px-6 py-16">
        {posts.length !== 0 ? (
          <div className="mx-auto sm:w-8/12 lg:w-6/12 xl:w-[50%]">
            <div className="grid gap-5 overflow-x-auto">
              <h1 className="text-center text-3xl">All books you wanted</h1>
              <CartProductTable />
              <p>
                <strong>Number of Items:</strong> {cartCount}
              </p>
              <p>
                <strong>Total:</strong> {formattedTotalPrice}
              </p>
              <div className="flex justify-center gap-5">
                <ButtonLink href="/">Top</ButtonLink>
                <ButtonLink href="/cart/checkout">Next</ButtonLink>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 text-center">
            <h1 className="text-3xl">No books you wanted</h1>
            <div className="flex justify-center gap-5">
              <ButtonLink href="/mypage/books/create">Find Books</ButtonLink>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Page

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

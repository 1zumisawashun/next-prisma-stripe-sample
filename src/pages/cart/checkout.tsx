import { NextPage, GetServerSideProps } from 'next'
import { Layout } from '@/components/layouts/Layout'
import { PrintObject } from '@/components/uis/PrintObject'

export default function page(props: NextPage) {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <ul className="card-list">
        <li>
          <PrintObject content={props} />
        </li>
      </ul>
    </Layout>
  )
}

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

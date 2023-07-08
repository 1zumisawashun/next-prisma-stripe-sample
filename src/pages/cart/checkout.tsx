import { NextPage, GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Layout } from '@/components/layouts/Layout'
import { PrintObject } from '@/components/uis/PrintObject'
import prisma from '@/functions/libs/prisma'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'

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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const host = req.headers.host || 'localhost:3000'
  const protocol = /^localhost/.test(host) ? 'http' : 'https'

  try {
    return {
      props: {
        products: []
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

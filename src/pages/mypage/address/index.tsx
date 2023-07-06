import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { getSession } from 'next-auth/react'
import { Address } from '@prisma/client'
import prisma from '@/functions/libs/prisma'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function page({ addresses }: { addresses: Address[] }) {
  const updateAddress = async (address: any): Promise<void> => {
    const res = await fetchPostJSON(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/mypage/address/update/${address.customerId}`,
      address
    )
    Router.push(`/mypage/address`)
  }

  return (
    <div className="container mx-auto px-6 py-16">
      {addresses.length > 0 ? (
        <div className="mx-auto sm:w-8/12 lg:w-6/12 xl:w-[40%]">
          <div className="overflow-x-auto">
            <h1 className="mb-8 text-center text-3xl">
              All addressed you registered
            </h1>
            <table className="w-full table-auto">
              <tbody className="divide-y divide-slate-100 text-sm font-medium">
                {addresses.map((address) => (
                  <tr
                    key={address.id}
                    className="group cursor-pointer transition-colors hover:bg-gray-100"
                  >
                    <td className="py-4 pl-10">
                      <div>
                        <p className="font-medium text-gray-600">
                          {address.postal_code} <br />
                          {address.state} {address.city} {address.line1} <br />
                          {address.line2}
                        </p>
                        <p className="font-medium text-gray-400">
                          {address.isAddressSelected ? '※選択済み' : '※未選択'}
                        </p>
                      </div>
                    </td>
                    <td className="text-center font-medium">
                      <span
                        aria-hidden="true"
                        onClick={() => updateAddress(address)}
                        className="mr-2 cursor-pointer rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-200 dark:text-green-900"
                      >
                        {address.isAddressSelected ? 'SELECTED' : 'SELECT'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // ブックマークしている記事が存在しない場合、記事の一覧ページへのリンクを表示します
        <div className="text-center">
          <h1 className="text-3xl">No Address Registered</h1>
          <Link href="/mypage/address/create" legacyBehavior>
            <a className="group mt-5 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 font-medium text-gray-900 hover:text-white focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800">
              <span className="rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                Register Address
              </span>
            </a>
          </Link>
        </div>
      )}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })

  if (!session) {
    res.statusCode = 401
    return { props: { books: null } }
  }

  const email = session?.user?.email as string

  const addresses = await prisma.user
    .findUnique({
      where: {
        email
      }
    })
    ?.customer()
    ?.address()

  return {
    props: { addresses }
  }
}

import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Router from 'next/router'
import { getSession } from 'next-auth/react'
import prisma from '@/functions/libs/prisma'
import { BookProps } from '@/functions/types/Book'

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function page({ books }: { books: BookProps[] }) {
  async function removeBookmark(id: number): Promise<void> {
    await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/bookmark/remove/${id}`,
      { method: 'PUT' }
    )
    Router.push('/mypage')
  }
  return (
    <div className="container mx-auto px-6 py-16">
      {books.length > 0 ? (
        // ブックマークしている記事が存在する場合、記事の一覧を表示します
        <div className="mx-auto sm:w-8/12 lg:w-6/12 xl:w-[40%]">
          <div className="overflow-x-auto">
            <h1 className="mb-8 text-center text-3xl">
              All books you bookmarked
            </h1>
            <table className="w-full table-auto">
              <tbody className="divide-y divide-slate-100 text-sm font-medium">
                {books.map((book) => (
                  <tr
                    key={book.id}
                    className="group transition-colors hover:bg-gray-100"
                  >
                    <td className="py-4 pl-10">
                      <div>
                        <p
                          aria-hidden="true"
                          onClick={() => Router.push(`/books/${book.id}`)}
                          className="cursor-pointer text-lg font-semibold text-gray-700"
                        >
                          {book.title}
                        </p>
                        <div className="font-medium text-gray-400">
                          {book.bookmarked_users.length > 1
                            ? //  ここでは user という単語の単数形と複数形の切り替えを行なっています
                              `${book.bookmarked_users.length} users`
                            : `${book.bookmarked_users.length} user`}{' '}
                          bookmarked this article
                        </div>
                      </div>
                    </td>
                    <td className="text-center font-medium">
                      <span
                        aria-hidden="true"
                        onClick={() => removeBookmark(book.id)}
                        className="mr-2 cursor-pointer rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-200 dark:text-red-900"
                      >
                        DELETE
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
          <h1 className="text-3xl">No books bookmarked</h1>
          <Link href="/books" legacyBehavior>
            <a className="group mt-5 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 font-medium text-gray-900 hover:text-white focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800">
              <span className="rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
                Find Books
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

  const data = await prisma.book.findMany({
    where: {
      bookmarked_users: {
        some: {
          email: session.user?.email as string
        }
      }
    },
    include: {
      posted_user: true
    }
  })
  const books = JSON.parse(JSON.stringify(data))

  return {
    props: { books }
  }
}

import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { getSession } from 'next-auth/react'
import prisma from '@/functions/libs/prisma'
import { BookProps } from '@/functions/types/Book'
import { ButtonLink } from '@/components/uis'

/* eslint-disable jsx-a11y/anchor-is-valid */
export default function page({ books }: { books: BookProps[] }) {
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
                    onClick={() => Router.push(`/books/${book.id}`)}
                    className="group cursor-pointer transition-colors hover:bg-gray-100"
                  >
                    <td className="py-4 pl-10">
                      <div>
                        <p
                          aria-hidden="true"
                          className="text-lg font-semibold text-gray-700"
                        >
                          {book.title}
                        </p>
                        <div className="font-medium text-gray-400">
                          {book?.bookmarked_users &&
                          book.bookmarked_users.length > 1
                            ? //  ここでは user という単語の単数形と複数形の切り替えを行なっています
                              `${book.bookmarked_users.length} users`
                            : `${book.bookmarked_users.length} user`}{' '}
                          bookmarked this article
                        </div>
                      </div>
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
          <ButtonLink href="/books">Find Books</ButtonLink>
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
      bookmarked_users: true
    }
  })
  const books = JSON.parse(JSON.stringify(data))

  return {
    props: { books }
  }
}

import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Router from 'next/router'
import prisma from '../../functions/libs/prisma'
import { BookProps } from '../../functions/types/Book'
import { User } from '../../functions/types/User'

type Props = {
  book: BookProps
  isBookmarked: boolean
}

export default function page({ book, isBookmarked }: Props) {
  async function addBookmark(id: number): Promise<void> {
    await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/bookmark/add/${id}`,
      {
        method: 'PUT'
      }
    )
    Router.push(`/books/${id}`)
  }

  async function removeBookmark(id: number): Promise<void> {
    await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/bookmark/remove/${id}`,
      {
        method: 'PUT'
      }
    )
    Router.push(`/books/${id}`)
  }
  return (
    <div className="styled-container">
      <div className="my-12 flex justify-center p-12">
        <div className="mx-auto w-full lg:w-8/12">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 text-center shadow-sm" />
          <h3 className="text-3xl font-semibold">{book.title}</h3>
          <p className="mt-4 text-lg leading-relaxed">{book.content}</p>
          {isBookmarked ? (
            // ブックマークされている場合には、ブックマークを削除するボタンを設置します
            <button
              type="button"
              onClick={() => removeBookmark(book.id)}
              className="mt-5 inline-flex items-center rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Remove Bookmark
              <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-200 text-xs font-semibold text-red-800">
                {book.bookmarked_users.length}
              </span>
            </button>
          ) : (
            // ブックマークされていない場合には、ブックマークするボタンを設置します
            <button
              type="button"
              onClick={() => addBookmark(book.id)}
              className="mt-5 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Bookmark this article
              <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800">
                {book.bookmarked_users.length}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  res
}) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { article: null } }
  }
  const data = await prisma.book.findUnique({
    where: {
      id: Number(params?.id)
    },
    include: {
      posted_user: true,
      bookmarked_users: true
    }
  })

  const book = JSON.parse(JSON.stringify(data))

  const isBookmarked = book.bookmarked_users.some(
    (user: User) => user.email === session.user?.email
  )
  return {
    props: { book, isBookmarked }
  }
}

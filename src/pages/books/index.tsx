import { GetStaticProps } from 'next'
import Router from 'next/router'
import prisma from '../../functions/libs/prisma'
import { BookProps } from '../../functions/types/Book'

export default function page({ books }: { books: BookProps[] }) {
  return (
    <div className="container mx-auto">
      <div className="mt-10 w-full px-8">
        <div className="flex flex-wrap">
          {books.map((book) => (
            <div
              key={book.id}
              className="w-full cursor-pointer px-2 lg:w-4/12"
              onClick={() => Router.push(`/books/${book.id}`)}
              aria-hidden="true"
            >
              <div className="relative mt-4 flex flex-col">
                <div className="flex-auto px-4 py-5">
                  <div className="text-blueGray-500 mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 text-center shadow-sm" />
                  <h6 className="mb-1 text-xl font-semibold">{book.title}</h6>
                  <p className="text-blueGray-500 mb-4 truncate hover:text-clip">
                    {book.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const books = await prisma.book.findMany()
  return {
    props: { books }
  }
}

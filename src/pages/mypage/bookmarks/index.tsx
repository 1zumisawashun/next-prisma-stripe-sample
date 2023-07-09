import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Book, User } from '@prisma/client'
import prisma from '@/functions/libs/prisma'
import { ButtonLink } from '@/components/uis'
import { BookCard } from '@/features/books'

type Props = {
  books: (Book & { bookmarked_users: User[] })[]
}
export default function page({ books }: Props) {
  return (
    <div className="container mx-auto px-6 py-16">
      {books.length > 0 ? (
        <div className="mx-auto sm:w-8/12 lg:w-6/12 xl:w-[50%]">
          <div className="grid gap-5 overflow-x-auto">
            <h1 className="text-center text-3xl">All books you bookmarked</h1>
            <div className="grid grid-cols-2 text-sm font-medium">
              {books.map((book) => (
                <BookCard {...book} key={book.id} />
              ))}
            </div>
            <div className="flex justify-center gap-5">
              <ButtonLink href="/mypage">Back</ButtonLink>
            </div>
          </div>
        </div>
      ) : (
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

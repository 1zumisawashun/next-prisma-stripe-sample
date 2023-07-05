import { getSession } from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { BookEditForm } from '@/features/books'
import prisma from '@/functions/libs/prisma'
import { BookProps } from '@/functions/types/Book'

export default function page({ book }: { book: BookProps }) {
  return <BookEditForm book={book} />
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query
}) => {
  const session = await getSession({ req })

  if (!session) {
    res.statusCode = 401
    return { props: { books: null } }
  }

  const { id } = query

  const data = await prisma.book.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      posted_user: true
    }
  })

  const book = JSON.parse(JSON.stringify(data))

  return {
    props: { book }
  }
}

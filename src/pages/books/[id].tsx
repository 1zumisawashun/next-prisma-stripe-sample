import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { User } from '@prisma/client'
import prisma from '@/functions/libs/prisma'
import { BookDetail } from '@/features/books'
import { BookDetailProps } from '@/features/books/books.type'

export default function page(props: BookDetailProps) {
  return <BookDetail {...props} />
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

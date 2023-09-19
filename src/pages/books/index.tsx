import { GetStaticProps } from 'next'
import { Book, User } from '@prisma/client'
import prisma from '@/functions/libs/prisma'
import { BookList } from '@/features/books'

type Props = {
  books: (Book & { bookmarked_users: User[] })[]
}

export default function page({ books }: Props) {
  return <BookList books={books} />
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await prisma.book.findMany({
    include: { bookmarked_users: true }
  })
  const books = JSON.parse(JSON.stringify(data))
  return {
    props: { books }
  }
}

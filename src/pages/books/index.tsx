import { GetStaticProps } from 'next'
import prisma from '@/functions/libs/prisma'
import { BookList } from '@/features/books'
import { BookListProps } from '@/features/books/books.type'

export default function page({ books }: BookListProps) {
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

import { GetStaticProps } from 'next'
import prisma from '../../functions/libs/prisma'
import { BookProps } from '../../functions/types/Book'
import { BookCard } from '@/features/books/components'

export default function page({ books }: { books: BookProps[] }) {
  return (
    <div className="styled-container">
      <div className="my-10 w-full">
        <div className="grid grid-cols-3 gap-9">
          {books.map((book) => (
            <BookCard {...book} key={book.id} />
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

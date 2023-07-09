import { GetStaticProps } from 'next'
import { Book, User } from '@prisma/client'
import prisma from '@/functions/libs/prisma'
import { BookCard } from '@/features/books'

type Props = {
  books: (Book & { bookmarked_users: User[] })[]
}

export default function page({ books }: Props) {
  return (
    <div className="styled-container">
      <div className="my-10 w-full">
        <div className="grid grid-cols-3 text-sm font-medium">
          {books.map((book) => (
            <BookCard {...book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  )
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

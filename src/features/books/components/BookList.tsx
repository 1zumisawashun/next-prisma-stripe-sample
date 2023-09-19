import { Book, User } from '@prisma/client'
import { BookCard } from '@/features/books'
import styles from '../styles/bookList.module.scss'

type BookListProps = {
  books: (Book & { bookmarked_users: User[] })[]
}

export const BookList = ({ books }: BookListProps) => {
  return (
    <div className="common-container">
      <div className={styles['card-list-container']}>
        <div className={styles['card-list-wrapper']}>
          {books.map((book) => (
            <BookCard {...book} key={book.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

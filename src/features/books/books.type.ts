import { Book, User } from '@prisma/client'

export type BookDetailProps = {
  book: Book & { bookmarked_users: User[] }
  isBookmarked: boolean
}

export type BookListProps = {
  books: (Book & { bookmarked_users: User[] })[]
}

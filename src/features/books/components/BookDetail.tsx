import { BookSummary } from '@/features/books'
import { BookDetailProps } from '@/features/books/books.type'

export const BookDetail = (props: BookDetailProps) => {
  return (
    <div className="styled-container">
      <div className="my-12 flex justify-center p-12">
        <BookSummary {...props} />
      </div>
    </div>
  )
}

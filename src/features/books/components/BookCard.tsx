import Router from 'next/router'
import { BookProps } from '@/functions/types/Book'

export const BookCard: React.FC<BookProps> = ({ title, content, id }) => {
  return (
    <div
      className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
      onClick={() => Router.push(`/books/${id}`)}
      aria-hidden="true"
    >
      <img
        className="rounded-t-lg"
        src="https://placehold.jp/400x250.png"
        alt=""
      />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {content}
        </p>
      </div>
    </div>
  )
}

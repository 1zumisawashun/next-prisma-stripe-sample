import { Book, User } from '@prisma/client'
import { useShoppingCart } from 'use-shopping-cart'
import { useBooks } from '@/features/books/hooks/useBooks'

type Props = {
  book: Book & { bookmarked_users: User[] }
  isBookmarked: boolean
}
export const BookSummary: React.FC<Props> = ({ book, isBookmarked }) => {
  const { addItem, removeItem } = useShoppingCart()
  const { addBookmark, removeBookmark, formatCartItem } = useBooks()

  return (
    <div className="mx-auto w-full lg:w-8/12">
      <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 text-center shadow-sm" />
      <h3 className="text-3xl font-semibold">{book.title}</h3>
      <p className="mt-4 text-lg leading-relaxed">{book.content}</p>
      {isBookmarked ? (
        <button
          type="button"
          onClick={() => removeBookmark(book.id)}
          className="mt-5 inline-flex items-center rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Remove Bookmark
          <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-200 text-xs font-semibold text-red-800">
            {book.bookmarked_users.length}
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => addBookmark(book.id)}
          className="mt-5 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Bookmark this article
          <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800">
            {book.bookmarked_users.length}
          </span>
        </button>
      )}
      <div className="flex gap-5">
        <button
          type="button"
          onClick={() => addItem(formatCartItem(book))}
          className="mt-5 inline-flex items-center rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          カートに追加する
          <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-200 text-xs font-semibold text-red-800">
            {book.bookmarked_users.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => removeItem(formatCartItem(book).id)}
          className="mt-5 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          カートから削除する
          <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800">
            {book.bookmarked_users.length}
          </span>
        </button>
      </div>
    </div>
  )
}

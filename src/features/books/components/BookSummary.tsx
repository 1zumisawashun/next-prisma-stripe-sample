import { useShoppingCart } from 'use-shopping-cart'
import { useBooks } from '@/features/books/hooks/useBooks'
import { BookDetailProps } from '@/features/books/books.type'
import styles from '@/features/books/styles/bookSummary.module.scss'
import { Button } from '@/components'

export const BookSummary = ({ book, isBookmarked }: BookDetailProps) => {
  const { addItem, removeItem } = useShoppingCart()
  const { addBookmark, removeBookmark, formatCartItem } = useBooks()

  return (
    <div className={styles['book-summary-container']}>
      <div className="gap-container">
        <img
          className={styles['book-summary-image']}
          src="https://placehold.jp/400x250.png"
          alt=""
        />
        <h3 className={styles['book-summary-title']}>{book.title}</h3>
        <p className={styles['book-summary-content']}>{book.content}</p>
        <div>
          {isBookmarked ? (
            <Button
              type="button"
              onClick={() => removeBookmark(book.id)}
              color="danger"
            >
              Remove Bookmark {book.bookmarked_users.length}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => addBookmark(book.id)}
              color="success"
            >
              Bookmark this article {book.bookmarked_users.length}
            </Button>
          )}
        </div>
        <div className="flex-gap-container">
          <Button
            type="button"
            onClick={() => addItem(formatCartItem(book))}
            theme="success"
            variant="outlined"
          >
            カートに追加する
          </Button>
          <Button
            type="button"
            onClick={() => removeItem(formatCartItem(book).id)}
            theme="danger"
            variant="outlined"
          >
            カートから削除する
          </Button>
        </div>
      </div>
    </div>
  )
}

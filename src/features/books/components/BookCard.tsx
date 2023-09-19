import { Book, User } from '@prisma/client'
import Router from 'next/router'
import styles from '../styles/bookCard.module.scss'

export const BookCard = ({
  id,
  title,
  content,
  bookmarked_users
}: Book & { bookmarked_users: User[] }) => {
  return (
    <div
      aria-hidden="true"
      className={styles['card-container']}
      onClick={() => Router.push(`/books/${id}`)}
    >
      <img
        className={styles['card-image']}
        src="https://placehold.jp/400x250.png"
        alt=""
      />
      <div>
        <p aria-hidden="true" className={styles['card-title']}>
          {title}
        </p>
        <div className={styles['card-text']}>
          {bookmarked_users && bookmarked_users.length > 1
            ? `${bookmarked_users.length} users`
            : `${bookmarked_users.length} user`}
          bookmarked this article
        </div>
      </div>
      <p className={styles['card-content']}>{content}</p>
    </div>
  )
}

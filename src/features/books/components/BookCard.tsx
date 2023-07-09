import { Book, User } from '@prisma/client'
import Router from 'next/router'

export const BookCard = ({
  id,
  title,
  content,
  bookmarked_users
}: Book & { bookmarked_users: User[] }) => {
  return (
    <div
      aria-hidden="true"
      className="group m-2 grid cursor-pointer gap-2 transition-colors"
      onClick={() => Router.push(`/books/${id}`)}
    >
      <img
        className="w-full rounded-lg"
        src="https://placehold.jp/400x250.png"
        alt=""
      />
      <div>
        <p aria-hidden="true" className="text-lg font-semibold text-gray-700">
          {title}
        </p>
        <div className="font-medium text-gray-400">
          {bookmarked_users && bookmarked_users.length > 1
            ? `${bookmarked_users.length} users`
            : `${bookmarked_users.length} user`}
          bookmarked this article
        </div>
      </div>
      <p className="font-medium text-gray-400 line-clamp-3">{content}</p>
    </div>
  )
}

import Link from 'next/link'
import Router from 'next/router'
import { Book, User } from '@prisma/client'

type Props = {
  posts: (Book & { bookmarked_users: User[] })[]
}
/* eslint-disable jsx-a11y/anchor-is-valid */
export const MypageBookTable = ({ posts }: Props) => {
  return (
    <table className="w-full table-auto">
      <tbody className="divide-y divide-slate-100  text-sm font-medium">
        {posts.map((post) => (
          <tr
            key={post.id}
            className="group  transition-colors hover:bg-gray-100"
          >
            <td className="w-2/6 p-3">
              <img
                className="rounded-lg"
                src="https://placehold.jp/400x250.png"
                alt=""
              />
            </td>
            <td className="w-4/6 p-3">
              <div>
                <p
                  aria-hidden="true"
                  onClick={() => Router.push(`/books/${post.id}`)}
                  className="cursor-pointer text-lg font-semibold text-gray-700"
                >
                  {post.title}
                </p>
                <div className="font-medium text-gray-400">
                  {post.bookmarked_users.length > 1
                    ? `${post.bookmarked_users.length} users`
                    : `${post.bookmarked_users.length} user`}
                  bookmarked this article
                </div>
                <p className="font-medium text-gray-500 line-clamp-2">
                  {post.content}
                </p>
              </div>
            </td>
            <td className="w-1/6 p-3">
              <div className="grid gap-5 text-center">
                <Link href={`/mypage/books/${post.id}/edit`} legacyBehavior>
                  <a className="cursor-pointer rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800">
                    EDIT
                  </a>
                </Link>
                <Link href={`/mypage/books/${post.id}/edit`} legacyBehavior>
                  <a className="cursor-pointer rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800">
                    DELETE
                  </a>
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

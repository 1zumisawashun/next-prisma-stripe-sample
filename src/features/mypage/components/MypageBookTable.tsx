import Router from 'next/router'
import { Book, User } from '@prisma/client'
import { LabelLink, LabelButton, Modal, Button } from '@/components/uis'
import { useDisclosure } from '@/functions/hooks'

type Props = {
  posts: (Book & { bookmarked_users: User[] })[]
}

export const MypageBookTable = ({ posts }: Props) => {
  const executeModal = useDisclosure()
  return (
    <>
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
                  <LabelLink type="edit" href={`/mypage/books/${post.id}/edit`}>
                    EDIT
                  </LabelLink>
                  <LabelButton type="delete" onClick={executeModal.open}>
                    DELETE
                  </LabelButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {executeModal.isOpen && (
        <Modal
          close={executeModal.close}
          header="削除"
          body="本当に削除しますか？"
          footer={
            <div className="flex justify-center gap-5">
              <Button type="button" onClick={executeModal.close}>
                Cancel
              </Button>
              <Button type="button" onClick={() => null}>
                delete
              </Button>
            </div>
          }
        />
      )}
    </>
  )
}

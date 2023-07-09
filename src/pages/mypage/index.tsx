import { NextPage } from 'next'
import Router from 'next/router'
import { signOut } from 'next-auth/react'
import { Modal, Button } from '@/components/uis'
import { useDisclosure } from '@/functions/hooks'

/* eslint-disable jsx-a11y/anchor-is-valid */
const Page: NextPage = () => {
  const logoutModal = useDisclosure()
  const items = [
    {
      name: '新規投稿',
      onClick: () => Router.push(`/mypage/books/create`),
      annotation: '新規登録を行うことができます。'
    },
    {
      name: '投稿一覧',
      onClick: () => Router.push(`/mypage/books`),
      annotation:
        '過去に投稿した記事を閲覧できます。投稿した編集を行う場合はこちらからお願いいたします。'
    },
    {
      name: 'ブックマーク一覧',
      onClick: () => Router.push(`/mypage/bookmarks`),
      annotation:
        '過去に保存した記事を閲覧できます。保存取り消しを行うこともできます。'
    },
    {
      name: '購入履歴一覧',
      onClick: () => Router.push(`/mypage/histories`),
      annotation: '過去に購入した記事を閲覧できます。'
    },
    {
      name: '支払い住所の変更',
      onClick: () => Router.push(`/mypage/address`),
      annotation: 'Stripe決済で使用している支払い住所の変更ができます。'
    },
    {
      name: '支払い方法の変更',
      onClick: () => Router.push(`/mypage/payment`),
      annotation:
        'Stripe決済で使用しているクレジットカード情報の更新を行えます。'
    },
    {
      name: 'ログアウト',
      onClick: logoutModal.open,
      annotation: 'ログアウトすることができます。'
    }
  ].map((item, index) => {
    return {
      id: index,
      ...item
    }
  })
  return (
    <>
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto sm:w-8/12 lg:w-6/12 xl:w-[50%]">
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <tbody className="divide-y divide-slate-100 text-sm font-medium">
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="group cursor-pointer transition-colors hover:bg-gray-100"
                    onClick={item.onClick}
                  >
                    <td className="py-4 pl-10">
                      <div>
                        <p className="text-lg font-semibold text-gray-700">
                          {item.name}
                        </p>
                        <div className="font-medium text-gray-400">
                          {item.annotation}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {logoutModal.isOpen && (
        <Modal
          close={logoutModal.close}
          header="ログアウト"
          body="本当にログアウトしますか？"
          footer={
            <div className="flex justify-center gap-5">
              <Button type="button" onClick={logoutModal.close}>
                Cancel
              </Button>
              <Button type="button" onClick={() => signOut()}>
                logout
              </Button>
            </div>
          }
        />
      )}
    </>
  )
}

export default Page

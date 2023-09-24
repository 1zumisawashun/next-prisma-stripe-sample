import Router from 'next/router'
import { signOut } from 'next-auth/react'
import { Modal, Button, TableList } from '@/components'
import { useDisclosure } from '@/functions/hooks'

export const MypageIndex = () => {
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
    // {
    //   name: '購入履歴一覧',
    //   onClick: () => Router.push(`/mypage/histories`),
    //   annotation: '過去に購入した記事を閲覧できます。'
    // },
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
      <div className="common-container -w576">
        <TableList items={items} />
      </div>

      <Modal close={logoutModal.close} isOpen={logoutModal.isOpen}>
        <div className="gap-container -center">
          <h1>ログアウト</h1>
          <p>本当にログアウトしますか？</p>
          <div className="flex-gap-container -center">
            <Button onClick={logoutModal.close}>キャンセル</Button>
            <Button onClick={() => signOut()}>ログアウト</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

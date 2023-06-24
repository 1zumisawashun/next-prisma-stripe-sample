import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // ここで、router オブジェクトを取得しています
  const router = useRouter()
  // status には、authenticated・unauthenticated・loading のいずれかが格納されます
  const { status } = useSession()

  // 下記の useEffect では、router（=ページ）、もしくは status に変更があった場合に、status の中身が「unauthenticated」であるかを確認しています
  // もしも、status が 「unauthenticated」だった場合、ログイン画面へのリダイレクトが行われます
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [router, status])

  if (status === 'unauthenticated') return null

  return children
}

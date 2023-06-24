import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { ProtectedRoute } from './ProtectedRoute'

// ログイン済みユーザにのみ表示するページ
// 今回は、マイページと記事の詳細ページに関して、ログインを要求します
const authRoutes = ['/mypage', '/articles/[id]']

// children に型をつけています
export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const session = useSession()
  const router = useRouter()

  // 認証情報取得中には、コンポーネントを表示させないようにしています
  if (session.status === 'loading') return null

  return authRoutes.includes(router.pathname) ? (
    // もしも、現在のページが、ログインを要求するページだった場合
    // ログイン状況に応じて、ページを表示するか or ログイン画面へリダイレクトさせるかを判定します
    // @ts-expect-error Server Component
    <ProtectedRoute>{children}</ProtectedRoute>
  ) : (
    // 現在のページが、ログインを要求しないページだった場合
    // 認証情報を調べる必要はないので、そのままページを表示させます
    children
  )
}

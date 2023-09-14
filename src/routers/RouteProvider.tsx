import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { RouteValidation } from './RouteValidation'

const authRoutes = ['/mypage', '/books/[id]']
export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const session = useSession()
  const router = useRouter()

  if (session.status === 'loading') return null

  return authRoutes.includes(router.pathname) ? (
    // @ts-expect-error Server Component
    <RouteValidation>{children}</RouteValidation>
  ) : (
    children
  )
}

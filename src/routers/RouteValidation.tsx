import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export const RouteValidation = ({
  children
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [router, status])

  if (status === 'unauthenticated') return null

  return children
}

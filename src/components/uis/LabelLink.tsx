import { ReactNode } from 'react'
import Link from 'next/link'
import { BaseLabel, LabelType } from './BaseLabel'

export const LabelLink: React.FC<{
  children: ReactNode
  type: LabelType
  href: string
}> = ({ children, type, href }) => {
  return (
    <Link href={href}>
      <BaseLabel type={type}>{children}</BaseLabel>
    </Link>
  )
}

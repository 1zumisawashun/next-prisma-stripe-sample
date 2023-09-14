import Link, { LinkProps } from 'next/link'
import { ReactNode, ComponentProps } from 'react'

type UnstyledButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
} & ComponentProps<'button'>
type UnstyledButtonAnchorProps = {
  children: ReactNode
} & LinkProps

export const UnstyledButton = ({
  type,
  children,
  ...props
}: UnstyledButtonProps) => {
  return (
    <button {...props} type="button">
      {children}
    </button>
  )
}

export const UnstyledButtonAnchor = ({
  children,
  ...props
}: UnstyledButtonAnchorProps) => {
  return <Link {...props}>{children}</Link>
}

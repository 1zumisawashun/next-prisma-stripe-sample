import Link, { LinkProps } from 'next/link'
import { ReactNode, ComponentPropsWithoutRef } from 'react'

export type UnstyledButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
} & ComponentPropsWithoutRef<'button'>
export type UnstyledButtonAnchorProps = {
  children: ReactNode
  className?: string
} & LinkProps

export const UnstyledButton = ({
  type = 'button',
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

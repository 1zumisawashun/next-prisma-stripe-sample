import Link, { LinkProps } from 'next/link'
import { ReactNode, ComponentProps } from 'react'

type Element<T extends 'button' | 'next-link'> = T extends 'button'
  ? ComponentProps<'button'>
  : LinkProps

type Props<T extends 'button' | 'next-link'> = {
  tag: T
  children: ReactNode
} & Element<T>

type Type = 'button' | 'next-link'

/* eslint-disable */
export const BaseButton = <T extends Type = 'button'>({
  tag,
  children,
  ...props
}: Props<T>) => {
  // FIXME:型ガードするしかない？
  if (tag === 'next-link') {
    const copiedProps = props as unknown as Props<'next-link'>
    return <Link {...copiedProps}>{children}</Link>
  }
  const copiedProps = props as unknown as Props<'button'>
  return <button {...copiedProps}>{children}</button>
}

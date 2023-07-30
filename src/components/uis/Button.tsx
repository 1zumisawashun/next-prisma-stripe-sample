import Link, { LinkProps } from 'next/link'
import { ReactNode, ComponentProps } from 'react'
import styles from '@/styles/components/button.module.scss'

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
    return <Link {...(props as unknown as Props<'next-link'>)}>{children}</Link>
  }
  return <button {...(props as unknown as Props<'button'>)}>{children}</button>
}

export const Button = <T extends Type = 'button'>({
  tag,
  children,
  ...props
}: Props<T>) => {
  // FIXME:型ガードするしかない？
  if (tag === 'next-link') {
    return (
      <Link
        {...(props as unknown as Props<'next-link'>)}
        className={styles.button}
      >
        <span>{children}</span>
      </Link>
    )
  }
  return (
    <button
      {...(props as unknown as Props<'button'>)}
      className={styles.button}
    >
      <span>{children}</span>
    </button>
  )
}

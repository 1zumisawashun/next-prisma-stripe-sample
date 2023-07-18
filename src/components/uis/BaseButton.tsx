import Link, { LinkProps } from 'next/link'
import { ReactNode, ComponentPropsWithoutRef, ElementType } from 'react'

type Element<T extends 'button' | 'next-link'> = T extends 'button'
  ? ElementType<'button'>
  : LinkProps

type Props<T extends 'button' | 'next-link'> = {
  tag?: Element<T>
} & Omit<ComponentPropsWithoutRef<'button'> | LinkProps, 'tag'>

type Type = 'button' | 'next-link'

type BaseButtonProps = (
  | {
      tag: 'next-link'
      href: LinkProps['href']
      onClick?: never
    }
  | {
      tag: 'button'
      onClick: () => void
      href?: never
    }
) & { children: ReactNode }

export const BaseButton: React.FC<BaseButtonProps> = ({ tag, ...props }) => {
  if (tag === 'next-link' && props.href) {
    // `as`が'a'の場合はリンク（<a>要素）としてレンダリング
    return (
      <Link {...props} href={props.href}>
        {props.children}
      </Link>
    )
  }
  // `as`が'button'の場合はボタン（<button>要素）としてレンダリング
  return (
    <button type="button" onClick={props.onClick} {...props}>
      {props.children}
    </button>
  )
}

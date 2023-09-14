import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'
import clsx from 'clsx'
import { ColorType, SizeType, getColor, getSize } from './useButton'

type Props = {
  children: ReactNode
  size?: SizeType
  variant?: 'outlined' | 'contained'
  color?: ColorType
} & LinkProps

export const AnchorButton = ({ children, color, size, ...props }: Props) => {
  return (
    <Link {...props} className={clsx(getColor(color), getSize(size))}>
      {children}
    </Link>
  )
}

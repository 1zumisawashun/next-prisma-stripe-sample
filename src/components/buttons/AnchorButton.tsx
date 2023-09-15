import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'
import clsx from 'clsx'
import {
  ColorType,
  SizeType,
  VariantType,
  getColorVariant,
  getSize
} from './useButton'

type Props = {
  children: ReactNode
  size?: SizeType
  variant?: VariantType
  color?: ColorType
} & LinkProps

export const AnchorButton = ({
  children,
  color = 'primary',
  variant = 'contained',
  size,
  ...props
}: Props) => {
  return (
    <Link
      {...props}
      className={clsx(getColorVariant({ color, variant }), getSize(size))}
    >
      {children}
    </Link>
  )
}

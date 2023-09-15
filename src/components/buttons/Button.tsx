import { ReactNode, ComponentProps } from 'react'
import clsx from 'clsx'
import {
  ColorType,
  SizeType,
  VariantType,
  getColorVariant,
  getSize
} from './useButton'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  size?: SizeType
  variant?: VariantType
  color?: ColorType
  children: ReactNode
} & ComponentProps<'button'>

export const Button = ({
  type,
  children,
  color = 'primary',
  variant = 'contained',
  size,
  ...props
}: ButtonProps) => {
  return (
    <button {...props} type="button">
      <span
        className={clsx(getColorVariant({ color, variant }), getSize(size))}
      >
        {children}
      </span>
    </button>
  )
}

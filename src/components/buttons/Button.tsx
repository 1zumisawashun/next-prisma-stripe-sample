import { ReactNode, ComponentProps } from 'react'
import clsx from 'clsx'
import {
  ColorType,
  SizeType,
  VariantType,
  getColorVariant,
  getSize,
  getStatus
} from './useButton'
import { CircularProgress } from '@/components/elements'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  size?: SizeType
  variant?: VariantType
  color?: ColorType
  children: ReactNode
  loading?: boolean
} & ComponentProps<'button'>

export const Button = ({
  type,
  children,
  color = 'primary',
  variant = 'contained',
  size = 'medium',
  loading,
  ...props
}: ButtonProps) => {
  const { disabled } = props
  return (
    <button
      {...props}
      type="button"
      className={clsx(
        getColorVariant({ color, variant }),
        getSize(size),
        getStatus(disabled ? 'disabled' : undefined),
        getStatus(loading ? 'loading' : undefined)
      )}
    >
      {loading ? <CircularProgress {...{ size, color, variant }} /> : children}
    </button>
  )
}

import { ReactNode, ComponentProps } from 'react'
import clsx from 'clsx'
import { ColorType, SizeType, getColor, getSize } from './useButton'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  size?: SizeType
  variant?: 'outlined' | 'contained'
  color?: ColorType
  children: ReactNode
} & ComponentProps<'button'>

export const Button = ({
  type,
  children,
  color,
  size,
  ...props
}: ButtonProps) => {
  return (
    <button {...props} type="button">
      <span className={clsx(getColor(color), getSize(size))}>{children}</span>
    </button>
  )
}

import clsx from 'clsx'
import { ThemeType, SizeType, VariantType } from '@/functions/types/Common'
import { CircularProgress } from '@/components/elements'
import { UnstyledButtonProps, UnstyledButton } from './UnstyledButton'
import styles from './styles.module.scss'

type ButtonProps = {
  size?: SizeType
  variant?: VariantType
  theme?: ThemeType
  loading?: boolean
} & UnstyledButtonProps

export const Button = ({
  type,
  children,
  theme = 'primary',
  variant = 'contained',
  size = 'medium',
  loading,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <UnstyledButton
      {...props}
      type="button"
      className={clsx(className, styles.module)}
      data-variant={variant}
      data-theme={theme}
      data-size={size}
      aria-disabled={disabled}
    >
      {loading ? <CircularProgress {...{ size, theme, variant }} /> : children}
    </UnstyledButton>
  )
}

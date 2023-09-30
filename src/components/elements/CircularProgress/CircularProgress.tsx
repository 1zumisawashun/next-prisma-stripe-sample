import clsx from 'clsx'
import { ThemeType, VariantType, SizeType } from '@/functions/types/Common'
import styles from './styles.module.scss'

type CircularProgressProps = {
  size: SizeType
  theme: ThemeType
  variant: VariantType
  className?: string
}
export const CircularProgress = ({
  size,
  theme,
  variant,
  className
}: CircularProgressProps) => {
  return (
    <span
      className={clsx(className, styles.module)}
      data-variant={variant}
      data-theme={theme}
      data-size={size}
    />
  )
}

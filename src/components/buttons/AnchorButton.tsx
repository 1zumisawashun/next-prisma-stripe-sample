import clsx from 'clsx'
import { ThemeType, SizeType, VariantType } from '@/functions/types/Common'
import {
  UnstyledButtonAnchorProps,
  UnstyledButtonAnchor
} from './UnstyledButton'
import styles from './styles.module.scss'

type Props = {
  size?: SizeType
  variant?: VariantType
  theme?: ThemeType
} & UnstyledButtonAnchorProps

export const AnchorButton = ({
  children,
  theme = 'primary',
  variant = 'contained',
  size = 'medium',
  className,
  ...props
}: Props) => {
  return (
    <UnstyledButtonAnchor
      {...props}
      className={clsx(className, styles.module)}
      data-variant={variant}
      data-theme={theme}
      data-size={size}
    >
      {children}
    </UnstyledButtonAnchor>
  )
}

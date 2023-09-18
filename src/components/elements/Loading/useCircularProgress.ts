import styles from './circularProgress.module.scss'
import { ColorType, VariantType, SizeType } from '@/functions/types/Common'

export const getColorVariant = ({
  color,
  variant
}: {
  color: ColorType
  variant: VariantType
}) => {
  const val = `${color}-${variant}`
  switch (val) {
    case 'primary-contained':
      return styles['circular-progress-primary-contained']
    case 'primary-outlined':
      return styles['circular-progress-primary-outlined']
    case 'danger-contained':
      return styles['circular-progress-danger-contained']
    case 'danger-outlined':
      return styles['circular-progress-danger-outlined']
    case 'success-contained':
      return styles['circular-progress-success-contained']
    case 'success-outlined':
      return styles['circular-progress-success-outlined']
    default:
      return styles['circular-progress-primary-contained']
  }
}

export const getSize = (size?: SizeType) => {
  switch (size) {
    case 'small':
      return styles.small
    case 'medium':
      return styles.medium
    case 'large':
      return styles.large
    default:
      return styles.medium
  }
}

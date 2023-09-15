import styles from './button.module.scss'

export type ColorType = 'primary' | 'secondary' | 'danger' | 'success'
export type VariantType = 'contained' | 'outlined'
export type SizeType = 'small' | 'medium' | 'large'
export type PositionType = 'start' | 'center' | 'end'

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
      return styles['button-primary-contained']
    case 'primary-outlined':
      return styles['button-primary-outlined']
    case 'danger-contained':
      return styles['button-danger-contained']
    case 'danger-outlined':
      return styles['button-danger-outlined']
    case 'success-contained':
      return styles['button-success-contained']
    case 'success-outlined':
      return styles['button-success-outlined']
    default:
      return styles['button-primary-contained']
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

export const getPosition = (position?: PositionType) => {
  switch (position) {
    case 'start':
      return styles.start
    case 'center':
      return styles.center
    case 'end':
      return styles.end
    default:
      return styles.center
  }
}

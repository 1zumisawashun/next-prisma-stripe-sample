import styles from './button.module.scss'

export type ColorType = 'primary' | 'secondary'
export type SizeType = 'small' | 'medium' | 'large'
export type PositionType = 'start' | 'center' | 'end'

export const getColor = (color?: ColorType) => {
  switch (color) {
    case 'primary':
      return styles['button-primary']
    case 'secondary':
      return styles['button-secondary']
    default:
      return styles['button-primary']
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

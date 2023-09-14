import styles from './label.module.scss'

export type LabelVariantType =
  | 'edit'
  | 'delete'
  | 'increment'
  | 'decrement'
  | 'selected'
  | 'default'

export const getLabelVariant = (labelVariant?: LabelVariantType) => {
  switch (labelVariant) {
    case 'delete':
    case 'decrement':
      return styles['label-red']
    case 'increment':
      return styles['label-blue']
    case 'selected':
    case 'edit':
      return styles['label-green']
    default:
      return styles.label
  }
}

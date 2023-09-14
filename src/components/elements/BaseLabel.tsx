import { ReactNode } from 'react'
import cn from 'classnames'
import styles from '@/styles/components/label.module.scss'

export type LabelType =
  | 'edit'
  | 'delete'
  | 'increment'
  | 'decrement'
  | 'selected'
  | 'default'
export const BaseLabel: React.FC<{
  children: ReactNode
  type: LabelType
}> = ({ children, type }) => {
  return (
    <span className={cn(styles.label, { [styles[type]]: true })}>
      {children}
    </span>
  )
}

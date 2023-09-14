import { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './label.module.scss'
import { getLabelVariant, LabelVariantType } from './useLabel'

type LabelProps = { children: ReactNode; variant: LabelVariantType }
export const Label = ({ children, variant }: LabelProps) => {
  return (
    <span className={clsx(styles.label, getLabelVariant(variant))}>
      {children}
    </span>
  )
}

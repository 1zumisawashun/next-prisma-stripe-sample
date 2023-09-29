import { FC, ReactNode } from 'react'
import styles from './input.module.scss'

type InputLabelProps = {
  isOptioned?: Boolean
  isRequired?: Boolean
  children: ReactNode
}

export const InputLabel: FC<InputLabelProps> = ({
  isOptioned,
  isRequired,
  children
}) => {
  return (
    <div className={styles['input-label-wrapper']}>
      <span className="">{children}</span>
      {isOptioned ? (
        <span className={styles['input-label-option']}>任意</span>
      ) : null}
      {isRequired ? (
        <span className={styles['input-label-require']}>必須</span>
      ) : null}
    </div>
  )
}

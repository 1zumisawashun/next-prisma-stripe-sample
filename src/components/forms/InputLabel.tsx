import { FC, ReactNode } from 'react'
import styles from './styles.module.scss'

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
    <>
      <p className={styles['input-label']}>{children}</p>
      {isOptioned ? (
        <span className={styles['input-label-option']}>任意</span>
      ) : null}
      {isRequired ? (
        <span className={styles['input-label-require']}>必須</span>
      ) : null}
    </>
  )
}

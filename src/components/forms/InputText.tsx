import React, { forwardRef, BaseSyntheticEvent } from 'react'
import styles from './input.module.scss'

export type InputTextProps = {
  // add your own props
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ ...props }, ref) => {
    return <input type="text" ref={ref} className={styles.input} {...props} />
  }
)

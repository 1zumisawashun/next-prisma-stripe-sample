import { FC, ReactNode } from 'react'
import styles from './input.module.scss'
import { InputLabel } from './InputLabel'

type InputWrapperProps = {
  id: string
  label?: string
  error?: string
  description?: string
  className?: string
  children: ReactNode
  isOptioned?: Boolean
  isRequired?: Boolean
}
export type InputWrapperPropsPassThroughProps = Omit<
  InputWrapperProps,
  'children' | 'className' | 'id'
>
export const InputWrapper: FC<InputWrapperProps> = ({
  id,
  label,
  error,
  className,
  description,
  children,
  isOptioned = false,
  isRequired = false
}) => {
  return (
    <div>
      <label className={className} htmlFor={id}>
        <InputLabel isOptioned={isOptioned} isRequired={isRequired}>
          {label}
        </InputLabel>
        {children}
      </label>
      {description && (
        <p className={styles['input-wrapper-description']}>{description}</p>
      )}
      {error && <p className={styles['input-wrapper-error']}>{error}</p>}
    </div>
  )
}

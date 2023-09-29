import React, { forwardRef, ComponentPropsWithRef, useId } from 'react'
import styles from './input.module.scss'
import { InputWrapper, InputWrapperPropsPassThroughProps } from './InputWrapper'

export type InputProps = ComponentPropsWithRef<'input'>
export type InputFieldProps = InputProps & InputWrapperPropsPassThroughProps
export const InputText = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, error, description, className, isOptioned, isRequired, ...props },
    ref
  ) => {
    const id = useId()
    return (
      <InputWrapper
        label={label}
        error={error}
        description={description}
        id={id}
        isOptioned={isOptioned}
        isRequired={isRequired}
      >
        <input className={styles.input} {...props} ref={ref} id={id} />
      </InputWrapper>
    )
  }
)

InputText.displayName = 'Input'

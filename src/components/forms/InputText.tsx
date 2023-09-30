import { forwardRef, ComponentPropsWithRef, useId } from 'react'
import styles from './styles.module.scss'
import { InputWrapper, InputWrapperPropsPassThroughProps } from './InputWrapper'

export type InputProps = ComponentPropsWithRef<'input'>
export type InputFieldProps = InputProps & InputWrapperPropsPassThroughProps
export const InputText = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      description,
      className,
      isOptioned,
      isRequired,
      disabled,
      ...props
    },
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
        disabled={disabled}
      >
        <input
          className={styles.module}
          {...props}
          ref={ref}
          id={id}
          data-error={Boolean(error)}
          disabled={disabled}
        />
      </InputWrapper>
    )
  }
)

InputText.displayName = 'Input'

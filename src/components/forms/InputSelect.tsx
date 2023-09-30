import { ComponentPropsWithRef, forwardRef, useId } from 'react'
import { InputWrapper, InputWrapperPropsPassThroughProps } from './InputWrapper'
import styles from './styles.module.scss'

export type SelectOption<T extends string = string> = {
  value: T
  label: string
}
export type SelectOptions<T extends string = string> = SelectOption<T>[]

export type SelectProps = ComponentPropsWithRef<'select'> & {
  options: SelectOptions
}

export type InputSelectProps = SelectProps & InputWrapperPropsPassThroughProps
export const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(
  (
    {
      label,
      error,
      description,
      options,
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
      >
        <select
          className={styles.module}
          {...props}
          ref={ref}
          id={id}
          data-error={Boolean(error)}
          disabled={disabled}
        >
          <option selected>未選択</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </InputWrapper>
    )
  }
)

InputSelect.displayName = 'Select'

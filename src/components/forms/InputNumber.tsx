import { forwardRef, ComponentPropsWithRef, useId } from 'react'
import styles from './styles.module.scss'
import { InputWrapper, InputWrapperPropsPassThroughProps } from './InputWrapper'

// NOTE:https://zenn.dev/leaner_dev/articles/20230711-input_type_number_mouse_wheel
export type InputProps = ComponentPropsWithRef<'input'>
export type InputNumberProps = InputProps & InputWrapperPropsPassThroughProps

// イベントハンドラを定義
const onWheelHandler = (e: React.WheelEvent<HTMLInputElement>) => {
  e.currentTarget.blur() // 発生元である<input>要素からフォーカスを外す = onWheelイベントをキャンセルする
  e.stopPropagation() // イベントのバブリング（イベントの親要素に対する伝播）を停止させる
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
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
      >
        <input
          type="number"
          {...props}
          ref={ref}
          className={styles.module}
          onWheel={onWheelHandler}
          data-error={Boolean(error)}
          disabled={disabled}
        />
      </InputWrapper>
    )
  }
)

InputNumber.displayName = 'InputNumber'

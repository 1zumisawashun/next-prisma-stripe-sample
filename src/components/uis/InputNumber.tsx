import React, { forwardRef, ComponentProps } from 'react'
import styles from '@/styles/components/input.module.scss'

// NOTE:https://zenn.dev/leaner_dev/articles/20230711-input_type_number_mouse_wheel
export type InputNumberProps = {
  // add your own props
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export type InputNumberProps2 = {
  // add your own props
} & ComponentProps<typeof InputNumber>

// イベントハンドラを定義
const onWheelHandler = (e: React.WheelEvent<HTMLInputElement>) => {
  e.currentTarget.blur() // 発生元である<input>要素からフォーカスを外す = onWheelイベントをキャンセルする
  e.stopPropagation() // イベントのバブリング（イベントの親要素に対する伝播）を停止させる
}

export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  ({ ...props }, ref) => {
    return (
      <input
        type="number"
        ref={ref}
        className={styles.input}
        onWheel={onWheelHandler}
        {...props}
      />
    )
  }
)

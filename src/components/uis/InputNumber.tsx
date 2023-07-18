import { BaseSyntheticEvent } from 'react'
import styles from '@/styles/components/input.module.scss'

type InputNumberProps = {
  name: string
  value: number
  min: number
  max: number
  step: number
  onChange: (e: BaseSyntheticEvent) => void
  className?: string
}

export const InputNumber: React.FC<InputNumberProps> = ({
  name,
  value,
  min,
  max,
  step,
  onChange,
  className
}) => {
  return (
    <input
      className={styles.input}
      type="number"
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    />
  )
}

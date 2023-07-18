import { BaseSyntheticEvent } from 'react'
import styles from '@/styles/components/input.module.scss'

type InputRangeProps = {
  name: string
  value: number
  min: number
  max: number
  step: number
  onChange: (e: BaseSyntheticEvent) => void
  className?: string
}

export const InputRange: React.FC<InputRangeProps> = ({
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
      type="range"
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    />
  )
}

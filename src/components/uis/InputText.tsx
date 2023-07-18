import { BaseSyntheticEvent } from 'react'
import styles from '@/styles/components/input.module.scss'

type InputTextProps = {
  name: string
  value: string
  onChange: (e: BaseSyntheticEvent) => void
  className?: string
  placeholder?: string
}

export const InputText: React.FC<InputTextProps> = ({
  name,
  value,
  onChange,
  className,
  placeholder
}) => {
  return (
    <input
      className={styles.input}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

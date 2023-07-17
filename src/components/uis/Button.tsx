import { ReactNode } from 'react'
import styles from '@/styles/components/button.module.scss'

type ButtonProps = {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  children: ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  type = 'button',
  disabled = false,
  children
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={styles.button}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  )
}

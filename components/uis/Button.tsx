import { ReactNode } from 'react'

type ButtonProps = {
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  children: ReactNode
}

/* eslint-disable react/button-has-type */
export const Button: React.FC<ButtonProps> = ({
  onClick,
  type = 'button',
  disabled = false,
  children
}) => {
  return (
    <button
      className="btn btn-blue"
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

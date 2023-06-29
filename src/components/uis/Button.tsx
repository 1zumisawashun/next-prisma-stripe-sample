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
      type={type}
      disabled={disabled}
      className="group relative inline-flex items-center justify-start overflow-hidden rounded bg-white px-6 py-3 font-medium transition-all hover:bg-white"
      onClick={onClick}
    >
      <span className="absolute bottom-0 left-0 mb-9 ml-9 h-48 w-48 -translate-x-full translate-y-full rotate-[-40deg] rounded bg-slate-800 transition-all duration-500 ease-out group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0" />
      <span className="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">
        {children}
      </span>
    </button>
  )
}

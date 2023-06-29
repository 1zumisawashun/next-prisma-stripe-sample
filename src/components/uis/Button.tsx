import { ReactNode } from 'react'

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
      className="group inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 font-medium text-gray-900 hover:text-white focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
      onClick={onClick}
    >
      <span className="rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
        {children}
      </span>
    </button>
  )
}

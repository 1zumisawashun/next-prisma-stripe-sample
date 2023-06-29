import { BaseSyntheticEvent } from 'react'

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
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

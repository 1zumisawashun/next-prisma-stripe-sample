import { BaseSyntheticEvent } from 'react'

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
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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

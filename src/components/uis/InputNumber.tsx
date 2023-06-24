type InputNumberProps = {
  name: string
  value: number
  min: number
  max: number
  step: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
      className={className}
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

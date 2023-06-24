type InputRangeProps = {
  name: string
  value: number
  min: number
  max: number
  step: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
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
      className={className}
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

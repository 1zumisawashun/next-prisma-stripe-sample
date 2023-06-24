type InputTextProps = {
  name?: string
  value?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
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
      className={className}
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}

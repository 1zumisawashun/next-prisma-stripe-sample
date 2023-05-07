import React from 'react'
import { formatAmountForDisplay } from '../../functions/helpers/stripe-helpers'

type Props = {
  name: string
  value: number
  min: number
  max: number
  currency: string
  step: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const CustomDonationInput = ({
  name,
  value,
  min,
  max,
  currency,
  step,
  onChange,
  className
}: Props) => (
  // eslint-disable-next-line jsx-a11y/label-has-associated-control
  <label>
    Custom donation amount ({formatAmountForDisplay(min, currency)}-
    {formatAmountForDisplay(max, currency)}):
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
    <input
      type="range"
      name={name}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
    />
  </label>
)

export default CustomDonationInput

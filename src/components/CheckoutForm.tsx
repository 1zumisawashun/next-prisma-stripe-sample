import React, { useState } from 'react'
import { getStripe } from '../functions/libs/stripejs'
import { fetchPostJSON } from '../functions/helpers/api-helpers'
import { formatAmountForDisplay } from '../functions/helpers/stripe-helpers'
import * as config from '../functions/constants/config'
import { Button, InputNumber, InputRange } from './uis'

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP)
  })

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/checkout_sessions', {
      amount: input.customDonation
    })

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    // Redirect to Checkout.
    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message)
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="customDonation">
        Custom donation amount (
        {formatAmountForDisplay(config.MIN_AMOUNT, config.CURRENCY)}-
        {formatAmountForDisplay(config.MAX_AMOUNT, config.CURRENCY)}):
      </label>
      <InputNumber
        className="elements-style"
        name="customDonation"
        value={input.customDonation}
        min={config.MIN_AMOUNT}
        max={config.MAX_AMOUNT}
        step={config.AMOUNT_STEP}
        onChange={handleInputChange}
      />
      <InputRange
        className="elements-style"
        name="customDonation"
        value={input.customDonation}
        min={config.MIN_AMOUNT}
        max={config.MAX_AMOUNT}
        step={config.AMOUNT_STEP}
        onChange={handleInputChange}
      />
      <Button type="submit" disabled={loading}>
        Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
      </Button>
    </form>
  )
}

export default CheckoutForm

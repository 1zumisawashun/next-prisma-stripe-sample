import React, { useState, BaseSyntheticEvent } from 'react'
import { getStripe } from '@/functions/libs/stripejs'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'
import { formatAmountForDisplay } from '@/functions/helpers/stripe-helpers'
import * as config from '@/functions/constants/config'
import { Button, InputNumber } from '@/components'

export const CheckoutForm = () => {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP)
  })

  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target
    setInput((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    // Create a Checkout Session.
    const response = await fetchPostJSON('/api/stripe/checkout_sessions', {
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
        name="customDonation"
        value={input.customDonation}
        min={config.MIN_AMOUNT}
        max={config.MAX_AMOUNT}
        step={config.AMOUNT_STEP}
        onChange={handleChange}
      />
      <Button disabled={loading} onClick={handleSubmit}>
        Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
      </Button>
    </form>
  )
}

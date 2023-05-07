import React, { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { PaymentIntent } from '@stripe/stripe-js'
import { fetchPostJSON } from '../functions/helpers/api-helpers'
import CustomDonationInput from './uis/CustomDonationInput'
import { PrintObject } from './uis/PrintObject'
import {
  formatAmountForDisplay,
  formatAmountFromStripe
} from '../functions/helpers/stripe-helpers'
import * as config from '../functions/constants/config'
import { PaymentStatus } from './uis/PaymentStatus'
import { Button } from './uis/Button'

type ElementsFormProps = {
  paymentIntent?: PaymentIntent | null
}

const ElementsForm: React.FC<ElementsFormProps> = ({
  paymentIntent = null
}) => {
  const defaultAmount = paymentIntent
    ? formatAmountFromStripe(paymentIntent.amount, paymentIntent.currency)
    : Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP)
  const [input, setInput] = useState({
    customDonation: defaultAmount,
    cardholderName: ''
  })
  const [paymentType, setPaymentType] = useState('')
  const [payment, setPayment] = useState({ status: 'initial', message: '' })
  const stripe = useStripe()
  const elements = useElements()

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    // Abort if form isn't valid
    if (!e.currentTarget.reportValidity()) return
    if (!elements) return
    setPayment({ status: 'processing', message: '' })

    // Create a PaymentIntent with the specified amount.
    const response = await fetchPostJSON('/api/payment_intents', {
      amount: input.customDonation,
      payment_intent_id: paymentIntent?.id
    })
    setPayment(response)

    if (response.statusCode === 500) {
      setPayment({ status: 'error', message: response.message })
      return
    }

    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe!.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/donate-with-elements',
        payment_method_data: {
          billing_details: {
            name: input.cardholderName
          }
        }
      }
    })

    if (error) {
      setPayment({
        status: 'error',
        message: error.message ?? 'An unknown error occurred'
      })
    } else if (paymentIntent) {
      setPayment({ status: paymentIntent as any, message: '' })
    }
  }

  const isDisabled = () => {
    return (
      !['initial', 'succeeded', 'error'].includes(payment.status) || !stripe
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CustomDonationInput
          className="elements-style"
          name="customDonation"
          value={input.customDonation}
          min={config.MIN_AMOUNT}
          max={config.MAX_AMOUNT}
          step={config.AMOUNT_STEP}
          currency={config.CURRENCY}
          onChange={handleInputChange}
        />
        <fieldset className="elements-style">
          <legend>Your payment details:</legend>
          {paymentType === 'card' ? (
            <input
              placeholder="Cardholder name"
              className="elements-style"
              type="Text"
              name="cardholderName"
              onChange={handleInputChange}
              required
            />
          ) : null}
          <div className="FormRow elements-style">
            <PaymentElement
              onChange={(e) => {
                setPaymentType(e.value.type)
              }}
            />
          </div>
        </fieldset>
        <Button type="submit" disabled={isDisabled()}>
          Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
        </Button>
      </form>
      <PaymentStatus status={payment.status} message={payment.message} />
      <PrintObject content={payment} />
    </>
  )
}

export default ElementsForm

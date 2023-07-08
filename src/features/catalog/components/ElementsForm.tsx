import React, { useState, BaseSyntheticEvent } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { PaymentIntent } from '@stripe/stripe-js'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'
import {
  formatAmountForDisplay,
  formatAmountFromStripe
} from '@/functions/helpers/stripe-helpers'
import * as config from '@/functions/constants/config'
import {
  PaymentStatus,
  Button,
  InputNumber,
  InputRange,
  InputText,
  PrintObject
} from '@/components/uis'

type ElementsFormProps = {
  paymentIntent?: PaymentIntent | null
}

export const ElementsForm: React.FC<ElementsFormProps> = ({
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

  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, value } = e.target
    setInput((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    if (!elements) return
    setPayment({ status: 'processing', message: '' })

    // Create a PaymentIntent with the specified amount.
    // 「増減させる＝値段を変更」してもupdateさせるので問題なし
    const response = await fetchPostJSON('/api/stripe/payment_intents', {
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
        return_url: 'http://localhost:3000/cart/thankyou',
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
        <InputRange
          name="customDonation"
          value={input.customDonation}
          min={config.MIN_AMOUNT}
          max={config.MAX_AMOUNT}
          step={config.AMOUNT_STEP}
          onChange={handleChange}
        />

        <fieldset>
          <legend>Your payment details:</legend>
          {paymentType === 'card' ? (
            <InputText
              value={input.cardholderName}
              placeholder="Cardholder name"
              name="cardholderName"
              onChange={handleChange}
            />
          ) : null}
          <div>
            <PaymentElement
              onChange={(e) => {
                setPaymentType(e.value.type)
              }}
            />
          </div>
        </fieldset>
        <Button type="button" disabled={isDisabled()} onClick={handleSubmit}>
          Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
        </Button>
      </form>
      <PaymentStatus status={payment.status} message={payment.message} />
      <PrintObject content={payment} />
    </>
  )
}

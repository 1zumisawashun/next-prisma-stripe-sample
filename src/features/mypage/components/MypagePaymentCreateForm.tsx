import React, { useMemo, useState } from 'react'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from '@stripe/react-stripe-js'
// import axios from 'axios'
// import useResponsiveFontSize from './useResponsiveFontSize'

const useOptions = () => {
  // const fontSize = useResponsiveFontSize()
  const options = useMemo(
    () => ({
      style: {
        base: {
          // fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Roboto, Source Code Pro, monospace, SFUIDisplay',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#9e2146'
        }
      }
    }),
    []
  )

  return options
}

// pm_1NQqtlEjv771bjTXbMkCgWwZ
export const MypagePaymentCreateForm = () => {
  const [isProcessing, setProcessingTo] = useState(false)
  const [checkoutError, setCheckoutError] = useState()

  const stripe = useStripe()
  const elements = useElements()
  const options = useOptions()

  const handleCardDetailsChange = (event: any) => {
    event.error
      ? setCheckoutError(event.error.message)
      : setCheckoutError(undefined)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }
    // card number element as the card element
    const cardNumberElement = elements?.getElement(CardNumberElement)
    // our payment process starts here
    if (cardNumberElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement
      })
      console.log(error, paymentMethod)
    }
  }

  /* eslint-disable */
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Card number</span>
        <CardNumberElement
          options={options}
          onChange={handleCardDetailsChange}
        />
      </label>
      <label>
        <span>Expiration date</span>

        <CardExpiryElement
          options={options}
          onChange={handleCardDetailsChange}
        />
      </label>
      <label>
        <span>CVC</span>
        <CardCvcElement options={options} onChange={handleCardDetailsChange} />
      </label>

      {/* {!checkoutError && <CheckoutError>{checkoutError}</CheckoutError>} */}
      <button type="submit" disabled={isProcessing || !stripe}>
        Checkout
      </button>
    </form>
  )
}

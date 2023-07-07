import React, { useMemo, useState, BaseSyntheticEvent } from 'react'
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from '@stripe/react-stripe-js'
import Router from 'next/router'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'

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

  const handleSubmit = async (event: BaseSyntheticEvent) => {
    event.preventDefault()

    if (!stripe || !elements) return

    const cardNumberElement = elements?.getElement(CardNumberElement)

    if (cardNumberElement) {
      // NOTE:stripeにクレカ情報を登録する
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement
      })
      // NOTE:stripeに登録したクレカ情報にユーザー情報を付与する
      const response = await fetchPostJSON(
        `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/payment_methods/attach`,
        { paymentMethodId: paymentMethod?.id }
      )
      console.log(response)
      Router.push(`/mypage/payment`)
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

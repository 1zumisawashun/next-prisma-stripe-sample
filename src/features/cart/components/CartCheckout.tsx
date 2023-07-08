import React, { useState, BaseSyntheticEvent } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { PaymentIntent } from '@stripe/stripe-js'
import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'
import {
  formatAmountForDisplay,
  formatAmountFromStripe
} from '@/functions/helpers/stripe-helpers'
import * as config from '@/functions/constants/config'
import { Button } from '@/components/uis'

type ElementsFormProps = {
  customerId: string | null
  paymentIntent?: PaymentIntent | null
  selectedPaymentId: string | null
}

export const CartCheckout: React.FC<ElementsFormProps> = ({
  customerId,
  paymentIntent = null,
  selectedPaymentId
}) => {
  const { addItem, removeItem, cartDetails, totalPrice } = useShoppingCart()

  console.log(customerId, paymentIntent, selectedPaymentId)

  const handleCheckout = async () => {
    const payment_intent_update = await fetchPostJSON(
      '/api/stripe/payment_intents/update',
      {
        customer_id: customerId,
        amount: totalPrice,
        payment_intent_id: paymentIntent?.id
      }
    )
    console.log(payment_intent_update, 'payment_intent_update')

    const payment_intent_confirm = await fetchPostJSON(
      '/api/stripe/payment_intents/confirm',
      {
        payment_intent_id: paymentIntent?.id,
        selectedPaymentId
      }
    )

    console.log(payment_intent_confirm, 'payment_intent_confirm')
  }

  return (
    <div>
      <p>{totalPrice}</p>
      <Button onClick={handleCheckout}>購入する</Button>
    </div>
  )
}

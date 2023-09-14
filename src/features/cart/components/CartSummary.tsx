import React, { useState, useEffect } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'
import { Button } from '@/components'

export const CartSummary = () => {
  const [loading, setLoading] = useState(false)
  const [cartEmpty, setCartEmpty] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout
  } = useShoppingCart()

  useEffect(() => setCartEmpty(!cartCount), [cartCount])

  const handleCheckout = async () => {
    setLoading(true)
    setErrorMessage('')

    const response = await fetchPostJSON(
      '/api/stripe/checkout_sessions/cart',
      cartDetails
    )

    if (response.statusCode > 399) {
      console.error(response.message)
      setErrorMessage(response.message)
      setLoading(false)
      return
    }

    redirectToCheckout(response.id as string)
  }

  return (
    <>
      <h2>Cart summary</h2>
      {errorMessage ? (
        <p style={{ color: 'red' }}>Error: {errorMessage}</p>
      ) : null}
      {/* This is where we'll render our cart */}
      <p suppressHydrationWarning>
        <strong>Number of Items:</strong> {cartCount}
      </p>
      <p suppressHydrationWarning>
        <strong>Total:</strong> {formattedTotalPrice}
      </p>

      {/* Redirects the user to Stripe */}
      <div>
        <Button
          tag="button"
          onClick={handleCheckout}
          disabled={cartEmpty || loading}
        >
          checkout
        </Button>
        <Button tag="button" onClick={clearCart}>
          Clear Cart
        </Button>
      </div>
    </>
  )
}

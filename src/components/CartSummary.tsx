import React, { useState, useEffect } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { fetchPostJSON } from '../functions/helpers/api-helpers'
import { Button } from './uis/Button'

const CartSummary = () => {
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

  const handleCheckout: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage('')

    const response = await fetchPostJSON(
      '/api/checkout_sessions/cart',
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
    <form onSubmit={handleCheckout}>
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
      <div className="btn-wrapper">
        <Button type="submit" disabled={cartEmpty || loading}>
          Checkout
        </Button>
        <Button onClick={clearCart}>Clear Cart</Button>
      </div>
    </form>
  )
}

export default CartSummary

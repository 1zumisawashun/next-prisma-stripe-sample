import { NextApiRequest, NextApiResponse } from 'next'
import {
  CURRENCY,
  MIN_AMOUNT,
  MAX_AMOUNT
} from '../../../../functions/constants/config'
import { formatAmountForStripe } from '../../../../functions/helpers/stripe-helpers'
import {
  stripe,
  StripeCheckoutSession,
  StripeCheckoutSessionCreateParams
} from '../../../../functions/libs/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { amount } = req.body
    try {
      // Validate the amount that was passed from the client.
      if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
        throw new Error('Invalid amount.')
      }
      // Create Checkout Sessions from body params.
      const params: StripeCheckoutSessionCreateParams = {
        // submit_type: 'donate',
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            // name: 'Custom amount donation',
            // amount: formatAmountForStripe(amount, CURRENCY),
            // currency: CURRENCY,
            price: 'price_1MUi0HEjv771bjTXHmDQ2BET',
            quantity: 1
          }
        ],
        success_url: `${req.headers.origin}/cart/thankyou?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`
      }
      const checkoutSession: StripeCheckoutSession =
        await stripe.checkout.sessions.create(params)
      res.status(200).json(checkoutSession)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

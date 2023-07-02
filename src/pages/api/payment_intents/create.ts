import { NextApiRequest, NextApiResponse } from 'next'
import { CURRENCY } from '../../../functions/constants/config'
import { formatAmountForStripe } from '../../../functions/helpers/stripe-helpers'
import {
  stripe,
  StripePaymentIntentCreateParams
} from '../../../functions/libs/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { amount }: { amount: number } = req.body

  try {
    // Create PaymentIntent from body params.
    const params: StripePaymentIntentCreateParams = {
      amount: formatAmountForStripe(amount, CURRENCY),
      currency: CURRENCY,
      description: process.env.STRIPE_PAYMENT_DESCRIPTION ?? '',
      automatic_payment_methods: {
        enabled: true
      }
    }

    const payment_intent = await stripe.paymentIntents.create(params)
    res.status(200).json(payment_intent)
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}

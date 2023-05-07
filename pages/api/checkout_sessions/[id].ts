import { NextApiRequest, NextApiResponse } from 'next'
import { stripe, StripeCheckoutSession } from '../../../libs/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: string = req.query.id as string
  try {
    if (!id.startsWith('cs_')) {
      throw Error('Incorrect CheckoutSession ID.')
    }
    const checkout_session: StripeCheckoutSession =
      await stripe.checkout.sessions.retrieve(id, {
        expand: ['payment_intent']
      })

    res.status(200).json(checkout_session)
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}

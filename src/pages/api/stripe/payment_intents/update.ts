import { NextApiRequest, NextApiResponse } from 'next'
import { CURRENCY } from '@/functions/constants/config'
import { formatAmountForStripe } from '@/functions/helpers/stripe-helpers'
import { stripe } from '@/functions/libs/stripe'
import paymentIntentsRetrieve from './retrieve'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    amount,
    payment_intent_id
  }: { amount: number; payment_intent_id: string } = req.body

  try {
    const current_intent = await paymentIntentsRetrieve(req, res)
    if (!current_intent) throw new Error()
    // If PaymentIntent has been created, just update the amount.

    const updated_intent = await stripe.paymentIntents.update(
      payment_intent_id,
      {
        amount: formatAmountForStripe(amount, CURRENCY)
      }
    )
    res.status(200).json(updated_intent)
  } catch (e) {
    if ((e as any).code !== 'resource_missing') {
      const message = e instanceof Error ? e.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message })
    }
  }
}

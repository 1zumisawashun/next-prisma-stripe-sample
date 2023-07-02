import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/functions/libs/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { payment_intent_id }: { payment_intent_id: string } = req.body

  try {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    )
    return current_intent
  } catch (e) {
    return null
  }
}

import { NextApiRequest, NextApiResponse } from 'next'
import { CURRENCY } from '@/functions/constants/config'
import { formatAmountForStripe } from '@/functions/helpers/stripe-helpers'
import { stripe } from '@/functions/libs/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    customer_id,
    amount,
    payment_intent_id
  }: { customer_id: string; amount: number; payment_intent_id: string } =
    req.body

  try {
    const params = {
      amount: formatAmountForStripe(amount, CURRENCY),
      currency: CURRENCY,
      description: process.env.STRIPE_PAYMENT_DESCRIPTION ?? '',
      // automatic_payment_methods: {
      //   enabled: true
      // },
      customer: customer_id
    }

    const updated_intent = await stripe.paymentIntents.update(
      payment_intent_id,
      params
    )
    res.status(200).json(updated_intent)
  } catch (e) {
    if ((e as any).code !== 'resource_missing') {
      const message = e instanceof Error ? e.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message })
    }
  }
}

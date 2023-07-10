import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/functions/libs/stripe'
import paymentIntentsRetrieve from './retrieve'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    selectedPaymentId,
    payment_intent_id
  }: { selectedPaymentId: string | null; payment_intent_id: string } = req.body

  try {
    const current_intent = await paymentIntentsRetrieve(req, res)
    if (!current_intent) throw new Error()
    // If PaymentIntent has been created, just update the amount.

    const confirm_intent = await stripe.paymentIntents.confirm(
      payment_intent_id,
      selectedPaymentId
        ? {
            payment_method: selectedPaymentId,
            return_url: 'http://localhost:3000/cart/thankyou'
          }
        : { return_url: 'http://localhost:3000/cart/thankyou' }
    )
    res.status(200).json(confirm_intent)
  } catch (e) {
    if ((e as any).code !== 'resource_missing') {
      const message = e instanceof Error ? e.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message })
    }
  }
}

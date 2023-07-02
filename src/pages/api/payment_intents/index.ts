import { NextApiRequest, NextApiResponse } from 'next'
import paymentIntentsCreate from './create'
import paymentIntentsUpdate from './update'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate the amount that was passed from the client.
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
    return
  }

  const {
    amount,
    payment_intent_id
  }: { amount: number; payment_intent_id?: string } = req.body

  // Validate the amount that was passed from the client.
  if (!amount) {
    res.status(500).json({ statusCode: 400, message: 'Invalid amount.' })
    return
  }

  if (payment_intent_id) {
    paymentIntentsUpdate(req, res)
  }
  paymentIntentsCreate(req, res)
}

import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/functions/libs/stripe'
import customersRetrieve from './retrieve'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { stripeId }: { stripeId: string } = req.body

  try {
    const current_customer = await customersRetrieve(req, res)
    if (!current_customer) throw new Error()

    const update_customer = await stripe.customers.update(stripeId, {})
    res.status(200).json(update_customer)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message })
  }
}

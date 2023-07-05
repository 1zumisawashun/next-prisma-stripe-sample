import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/functions/libs/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { stripeId }: { stripeId: string } = req.body

  try {
    const retrieve_customer = await stripe.customers.retrieve(stripeId)
    return retrieve_customer
  } catch (e) {
    return null
  }
}

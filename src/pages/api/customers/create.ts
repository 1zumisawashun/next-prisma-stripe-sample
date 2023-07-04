import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/functions/libs/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email }: { email: string } = req.body

  try {
    const customer = await stripe.customers.create({ email })
    // NOTE:prismaでuserに追加する
    res.status(200).json(customer)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message })
  }
}

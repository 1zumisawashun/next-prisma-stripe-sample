import { NextApiRequest, NextApiResponse } from 'next'
import customersCreate from './create'
import customersUpdate from './update'

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

  const { email, stripeId }: { email: string; stripeId?: string } = req.body

  // Validate the amount that was passed from the client.
  if (!email) {
    res.status(500).json({ statusCode: 400, message: 'Invalid amount.' })
    return
  }

  if (stripeId) {
    customersUpdate(req, res)
  }
  customersCreate(req, res)
}

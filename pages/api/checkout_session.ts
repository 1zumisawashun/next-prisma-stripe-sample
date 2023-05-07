import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../libs/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method && req.method.toLocaleLowerCase() !== 'post') {
    return res.status(405).end()
  }

  try {
    const { price, quantity } = req.body

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        price,
        quantity
        // adjustable_quantity: {
        //     enabled: true,
        //     minimum: 1,
        //     maximum: 10,
        // }
      ],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/'
    })
    return res.redirect(301, session.url!)
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Internal server error'
    return res.status(500).json({ statusCode: 500, message: errorMessage })
  }
}

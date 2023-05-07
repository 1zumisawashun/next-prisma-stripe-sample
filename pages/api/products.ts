import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../functions/libs/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method && req.method.toLocaleLowerCase() !== 'get') {
    res.status(405).end()
  }

  const products = await stripe.products.list()

  if (!products.data || products.data.length < 1) {
    return res.status(200).json([])
  }
  const response = await Promise.all(
    products.data.map(async (product, i) => {
      const prices = await stripe.prices.list({
        product: product.id
      })
      return {
        id: product.id,
        description: product.description,
        name: product.name,
        images: product.images,
        unit_label: product.unit_label,
        prices: prices.data.map((price) => {
          return {
            id: price.id,
            currency: price.currency,
            transform_quantity: price.transform_quantity,
            unit_amount: price.unit_amount
          }
        })
      }
    })
  )

  return res.status(200).json(response)
}

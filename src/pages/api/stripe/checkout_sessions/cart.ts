import { NextApiRequest, NextApiResponse } from 'next'
import {
  stripe,
  StripeCheckoutSession,
  StripeCheckoutSessionCreateParams
} from '../../../../functions/libs/stripe'
import inventory from '../../../../functions/constants/products'

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
// import { validateCartItems } from 'use-shopping-cart/utilities/serverless'
const { validateCartItems } = require('use-shopping-cart/utilities')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Validate the cart details that were sent from the client.
      const line_items = validateCartItems(inventory, req.body)
      const hasSubscription = line_items.find((item: any) => {
        return !!item.price_data.recurring
      })
      // Create Checkout Sessions from body params.
      const params: StripeCheckoutSessionCreateParams = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['US', 'CA']
        },
        line_items,
        success_url: `${req.headers.origin}/cart/thankyou?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
        mode: hasSubscription ? 'subscription' : 'payment'
      }

      const checkoutSession: StripeCheckoutSession =
        await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession)
    } catch (err) {
      console.log(err)
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}

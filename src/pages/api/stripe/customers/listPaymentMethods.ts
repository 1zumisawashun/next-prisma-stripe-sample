import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import prisma from '@/functions/libs/prisma'
import { options } from '@/pages/api/auth/[...nextauth]'
import { stripe } from '@/functions/libs/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, options)
  const { paymentMethodId } = req.body as { paymentMethodId?: string }

  if (!session?.user?.email) throw new Error()

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email
    }
  })

  if (user?.customerId && paymentMethodId) {
    const list_payment_methods = await stripe.customers.listPaymentMethods(
      user.customerId,
      { type: 'card' }
    )
    res.json(list_payment_methods)
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

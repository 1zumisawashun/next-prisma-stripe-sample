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

  const customerId = user?.customerId

  if (customerId && paymentMethodId) {
    const attach_payment_method = await stripe.paymentMethods.attach(
      paymentMethodId,
      { customer: customerId }
    )
    res.json(attach_payment_method)
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

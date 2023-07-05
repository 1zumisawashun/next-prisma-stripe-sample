import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import prisma from '@/functions/libs/prisma'
import { options } from '@/pages/api/auth/[...nextauth]'
import { StripeAddress, stripe } from '@/functions/libs/stripe'
import customersRetrieve from '@/pages/api/customers/retrieve'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, options)
  const email = session?.user?.email as string
  const address = req.body as StripeAddress

  const customer = await prisma.user
    .findUnique({
      where: {
        email
      }
    })
    ?.customer()

  const customerId = customer?.id
  console.log(customerId, 'customerId==============')

  if (customerId) {
    const create_address = await prisma.address.create({
      data: {
        city: address.city,
        country: '日本',
        line1: address.line1,
        line2: address.line2,
        postal_code: address.postal_code,
        state: address.state,
        isAddressSelected: false,
        customer: { connect: { id: customerId } }
      }
    })
    const retrieve_customer = await stripe.customers.retrieve(customerId)
    console.log(retrieve_customer, 'retrieve_customer============')

    res.status(200).json(create_address)
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

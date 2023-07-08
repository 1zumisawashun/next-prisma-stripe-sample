import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '@/functions/libs/stripe'
import prisma from '@/functions/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, userId }: { email: string; userId: number } = req.body

  try {
    const customer = await stripe.customers.create({ email })
    console.log(customer)

    const prisma_customer = await prisma.customer.create({
      data: {
        id: customer.id,
        description: customer.description,
        email: customer.email ?? email,
        metadata: {},
        name: customer.name ?? 'テスト',
        phone: customer.phone ?? 'テスト',
        user: { connect: { id: userId } }
      }
    })
    console.log(prisma_customer)

    res.status(200).json(customer)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    res.status(500).json({ statusCode: 500, message })
  }
}

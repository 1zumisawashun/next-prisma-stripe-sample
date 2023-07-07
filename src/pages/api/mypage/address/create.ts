import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { Address } from '@prisma/client'
import prisma from '@/functions/libs/prisma'
import { options } from '@/pages/api/auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, options)
  const email = session?.user?.email as string
  const address = req.body as Address

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  const customerId = user?.customerId

  if (customerId) {
    const create_address = await prisma.address.create({
      data: {
        city: address.city,
        country: '日本',
        line1: address.line1,
        line2: address.line2,
        postal_code: address.postal_code,
        state: address.state,
        user: { connect: { id: user.id } }
      }
    })

    res.status(200).json(create_address)
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

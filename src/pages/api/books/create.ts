import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import prisma from '@/functions/libs/prisma'
import { options } from '@/pages/api/auth/[...nextauth]'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, options)
  const { title, content } = req.body

  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email
      }
    })
    if (user) {
      const result = await prisma.book.create({
        data: {
          title,
          content,
          price: 1000,
          posted_user: {
            connect: { id: user.id }
          }
        }
      })
      res.json(result)
    } else {
      res.status(401).send({ message: 'Unauthorized' })
    }
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

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
  console.log(title, content, 'title, content')

  if (session?.user?.email) {
    const result = await prisma.book.update({
      where: {
        id: Number(req.query.id)
      },
      data: {
        title,
        content
      }
    })
    console.log(result, 'result')
    res.json(result)
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

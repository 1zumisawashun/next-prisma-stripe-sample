import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/functions/libs/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validate the amount that was passed from the client.
  if (req.method !== 'PUT') {
    res.setHeader('Allow', 'PUT')
    res.status(405).end('Method Not Allowed')
    return
  }
  const session = await getSession({ req })

  if (session?.user?.email) {
    const result = await prisma.book.update({
      where: {
        id: Number(req.query.id)
      },
      data: {
        bookmarked_users: {
          // ブックマークを追加する API と異なるのはこの部分だけです
          // disconnect とすることで、記事とユーザの紐付けを削除することができます
          disconnect: { email: session?.user?.email }
        }
      }
    })
    res.json(result)
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

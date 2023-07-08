import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/functions/libs/prisma'

// リクエストとレスポンスの型を指定しています
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
  // ここで、req のオブジェクトから認証情報を取得しています
  const session = await getSession({ req })

  // session オブジェクトに email が存在しているかを判定しています
  // Prisma によるスキーマの作成を行なった際に、users テーブルの email カラムは必須にしたので、ログインしていれば email にはメールアドレスが格納されているはずです
  if (session?.user?.email) {
    const result = await prisma.book.update({
      where: {
        id: Number(req.query.id)
      },
      data: {
        bookmarked_users: {
          connect: { email: session?.user?.email }
        }
      }
    })
    res.json(result)
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

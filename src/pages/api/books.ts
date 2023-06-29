import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '@/functions/libs/prisma'

// リクエストとレスポンスの型を指定しています
export default async function (req: NextApiRequest, res: NextApiResponse) {
  // ここで、req のオブジェクトから認証情報を取得しています
  const session = await getSession({ req })

  // session オブジェクトに email が存在しているかを判定しています
  // Prisma によるスキーマの作成を行なった際に、users テーブルの email カラムは必須にしたので、ログインしていれば email にはメールアドレスが格納されているはずです
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email
      }
    })
    const result = await prisma.book.create({
      data: {
        title: 'title2',
        content: 'content2',
        published: false,
        posted_user: {
          connect: { id: user!.id }
        }
      }
    })
    res.json(result)
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

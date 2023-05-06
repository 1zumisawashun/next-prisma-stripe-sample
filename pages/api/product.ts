import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET以外のリクエストを許可しない
  if (req.method && req.method.toLocaleLowerCase() !== 'get') {
    return res.status(405).end()
  }
  return res.status(200).json([
    {
      name: '胡麻鯖セット',
      price: 5000
    },
    {
      name: '明太子詰め合わせ',
      price: 6000
    }
  ])
}

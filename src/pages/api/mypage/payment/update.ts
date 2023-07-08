import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/functions/libs/prisma'

type UpdatePaymentProps = {
  selectedPaymentId: string
  userId: number
}

const updateSelectedPaymentId = async ({
  userId,
  selectedPaymentId
}: UpdatePaymentProps) => {
  const update_payment = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      selectedPaymentId
    }
  })

  return update_payment
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { selectedPaymentId, userId } = req.body as {
    selectedPaymentId: string
    userId: number
  }

  if (selectedPaymentId && userId) {
    const update_selected_payment_id = await updateSelectedPaymentId({
      selectedPaymentId,
      userId
    })
    console.log(update_selected_payment_id)

    res.status(200).json(update_selected_payment_id)
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

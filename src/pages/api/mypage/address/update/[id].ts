import { NextApiRequest, NextApiResponse } from 'next'
import { Address } from '@prisma/client'
import prisma from '@/functions/libs/prisma'
import { StripeCustomerUpdateParams, stripe } from '@/functions/libs/stripe'

type UpdateAddressProps = {
  selectedAddressId: number
  userId: number
}

const updateSelectedAddressId = async ({
  userId,
  selectedAddressId
}: UpdateAddressProps) => {
  const update_address = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      selectedAddressId
    }
  })

  return update_address
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    customerId,
    id: selectedAddressId,
    userId,
    ...rest
  } = req.body as Address & {
    customerId?: string
  }

  if (customerId && userId) {
    const update_selected_address_id = await updateSelectedAddressId({
      selectedAddressId,
      userId
    })
    console.log(update_selected_address_id)

    const retrieve_customer = await stripe.customers.retrieve(customerId)

    if ('address' in retrieve_customer) {
      const update_customer = await stripe.customers.update(customerId, {
        address: rest
      })
      console.log(update_customer)
    }
    res.status(200).json(retrieve_customer)
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

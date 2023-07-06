import { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { Address as PrismaAddress } from '@prisma/client'
import prisma from '@/functions/libs/prisma'
import { options } from '@/pages/api/auth/[...nextauth]'
import { StripeCustomerUpdateParams, stripe } from '@/functions/libs/stripe'

type UpdateAddressProps = {
  id: number
  isAddressSelected: boolean
}

const updateAddress = async ({ id, isAddressSelected }: UpdateAddressProps) => {
  const update_address = await prisma.address.update({
    where: {
      id
    },
    data: {
      isAddressSelected: !isAddressSelected
    }
  })
  console.log(update_address, 'update_addressに成功しました!')
  return update_address
}

const retrieveSelectedAddress = async ({ email }: { email: string }) => {
  const selected_addresses = await prisma.user
    .findUnique({
      where: {
        email
      }
    })
    ?.customer()
    ?.address({
      where: { isAddressSelected: true }
    })
  console.log(selected_addresses, 'selected_addressesに成功しました!')
  return selected_addresses
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, options)
  const email = session?.user?.email as string
  const { id, customerId, isAddressSelected, ...rest } =
    req.body as PrismaAddress

  if (customerId) {
    // NOTE:選択されていた住所を取得する
    const selected_addresses = await retrieveSelectedAddress({ email })

    if (selected_addresses.length !== 0) {
      const ids = selected_addresses.map((address) => address.id)
      if (!ids.includes(id)) {
        // NOTE:選択されていた住所をリセット（false）する
        await updateAddress({ id: ids[0], isAddressSelected: true })
        await updateAddress({ id, isAddressSelected })
      } else {
        await updateAddress({ id, isAddressSelected })
      }
    } else {
      await updateAddress({ id, isAddressSelected })
    }

    const retrieve_customer = await stripe.customers.retrieve(customerId)
    console.log(retrieve_customer, 'retrieve_customerに成功しました!')

    // Stripe.Responseがimportできないのでinを使って型定義のnarrowingをする
    if ('address' in retrieve_customer) {
      const update_customer = await stripe.customers.update(customerId, {
        address: rest
      } as StripeCustomerUpdateParams)
      console.log(update_customer, 'update_customerに成功しました!')
    }
    res.status(200).json(retrieve_customer)
  } else {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

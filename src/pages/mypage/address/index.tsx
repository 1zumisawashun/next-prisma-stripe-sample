import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { getSession } from 'next-auth/react'
import { Address } from '@prisma/client'
import prisma from '@/functions/libs/prisma'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'
import { ButtonLink } from '@/components/uis'
import { MypageAddressTable } from '@/features/mypage'

type Props = {
  customerId?: string
  selectedAddressId?: number
  addresses: Address[]
}
export default function page({
  customerId,
  selectedAddressId,
  addresses
}: Props) {
  const updateAddress = async (address: Address): Promise<void> => {
    const response = await fetchPostJSON(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/mypage/address/update`,
      { ...address, customerId }
    )
    console.log(response)
    Router.push(`/mypage/address`)
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mx-auto sm:w-8/12 lg:w-6/12 xl:w-[40%]">
        <div className="grid gap-5 overflow-x-auto">
          <h1 className="text-center text-3xl">
            {addresses.length > 0
              ? 'All Addresses You Registered'
              : 'No Address Registered'}
          </h1>

          {addresses.length > 0 && (
            <MypageAddressTable
              addresses={addresses}
              selectedAddressId={selectedAddressId}
              onClick={updateAddress}
            />
          )}

          <div className="text-center">
            <ButtonLink href="/mypage/address/create">
              Register Address
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })

  if (!session) {
    res.statusCode = 401
    return { props: { books: null } }
  }

  const email = session?.user?.email as string

  const user = await prisma.user.findUnique({
    where: {
      email
    },
    include: {
      addresses: true
    }
  })

  return {
    props: {
      customerId: user?.customerId,
      selectedAddressId: user?.selectedAddressId ?? 0,
      addresses: user?.addresses ?? []
    }
  }
}

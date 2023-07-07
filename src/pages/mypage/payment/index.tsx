import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { getSession } from 'next-auth/react'
import { Address } from '@prisma/client'
import prisma from '@/functions/libs/prisma'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'
import { ButtonLink } from '@/components/uis'
import { stripe } from '@/functions/libs/stripe'
import { MypagePaymentTable } from '@/features/mypage'

export default function page({
  list_payment_methods
}: {
  list_payment_methods: any[]
}) {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mx-auto sm:w-8/12 lg:w-6/12 xl:w-[40%]">
        <div className="grid gap-5 overflow-x-auto">
          <h1 className="text-center text-3xl">
            {list_payment_methods.length > 0
              ? 'All Payments You Registered'
              : 'No Payment Registered'}
          </h1>

          <MypagePaymentTable list_payment_methods={list_payment_methods} />

          <div className="text-center">
            <ButtonLink href="/mypage/payment/create">
              Register Payment
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
    }
  })

  if (user?.customerId) {
    const list_payment_methods = await stripe.customers.listPaymentMethods(
      user.customerId,
      { type: 'card' }
    )
    console.log(list_payment_methods, 'list_payment_methods')
    return {
      props: { list_payment_methods }
    }
  }
  return {
    props: { list_payment_methods: [] }
  }
}

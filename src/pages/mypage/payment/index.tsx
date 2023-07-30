import { GetServerSideProps } from 'next'
import Router from 'next/router'
import { getSession } from 'next-auth/react'
import prisma from '@/functions/libs/prisma'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'
import { Button } from '@/components/uis'
import { stripe, StripePaymentMethod } from '@/functions/libs/stripe'
import { MypagePaymentTable } from '@/features/mypage'

type Props = {
  userId: string
  selectedPaymentId: string | null
  payment_methods: StripePaymentMethod[]
}
export default function page({
  userId,
  selectedPaymentId,
  payment_methods
}: Props) {
  const updatePayment = async (id: string): Promise<void> => {
    const response = await fetchPostJSON(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/mypage/payment/update`,
      { selectedPaymentId: id, userId }
    )
    console.log(response)
    Router.push(`/mypage/payment`)
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mx-auto sm:w-8/12 lg:w-6/12 xl:w-[50%]">
        <div className="grid gap-5 overflow-x-auto">
          <h1 className="text-center text-3xl">
            {payment_methods.length > 0
              ? 'All Payments You Registered'
              : 'No Payment Registered'}
          </h1>

          <MypagePaymentTable
            onClick={updatePayment}
            selectedPaymentId={selectedPaymentId}
            payment_methods={payment_methods}
          />

          <div className="flex justify-center gap-5">
            <Button tag="next-link" href="/mypage">
              Back
            </Button>
            <Button tag="next-link" href="/mypage/payment/create">
              Register Payment
            </Button>
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
    const { data } = await stripe.customers.listPaymentMethods(
      user.customerId,
      { type: 'card' }
    )
    console.log(data)

    return {
      props: {
        userId: user.id,
        selectedPaymentId: user.selectedPaymentId,
        payment_methods: data
      }
    }
  }
  return {
    props: { list_payment_methods: [] }
  }
}

import { NextPage, GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { PaymentIntent } from '@stripe/stripe-js'
import { getSession } from 'next-auth/react'
import { Address } from '@prisma/client'
import { getStripe } from '@/functions/libs/stripejs'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'
import { Layout } from '@/components/layouts/Layout'
import * as config from '@/functions/constants/config'
import { CartCheckout } from '@/features/cart'
import prisma from '@/functions/libs/prisma'
import { stripe, StripePaymentMethod } from '@/functions/libs/stripe'

const Page: NextPage<{
  payment: StripePaymentMethod | null
  address: Address | null
  customerId: string | null
  selectedPaymentId: string | null
}> = ({ payment, address, customerId, selectedPaymentId }) => {
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null)

  const asyncFunc = async () => {
    const res = await fetchPostJSON('/api/stripe/payment_intents', {
      amount: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP)
    })
    setPaymentIntent(res)
  }

  useEffect(() => {
    asyncFunc()
  }, [])

  return (
    <Layout title="Donate with Elements | Next.js + TypeScript Example">
      <div className="container mx-auto px-6 py-16">
        <div className="mx-auto sm:w-8/12 lg:w-6/12 xl:w-[50%]">
          <div className="grid gap-5 overflow-x-auto">
            {paymentIntent && paymentIntent.client_secret ? (
              <Elements
                stripe={getStripe()}
                options={{
                  appearance: {
                    variables: {
                      colorIcon: '#6772e5',
                      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif'
                    }
                  },
                  clientSecret: paymentIntent.client_secret
                }}
              >
                <CartCheckout
                  address={address}
                  payment={payment}
                  customerId={customerId}
                  paymentIntent={paymentIntent}
                  selectedPaymentId={selectedPaymentId}
                />
              </Elements>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Page

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

  const address = user?.selectedAddressId
    ? await prisma.address.findUnique({
        where: {
          id: user.selectedAddressId
        }
      })
    : null

  const payment =
    user?.customerId && user?.selectedPaymentId
      ? await stripe.customers.retrievePaymentMethod(
          user.customerId,
          user.selectedPaymentId
        )
      : null

  return {
    props: {
      payment,
      address,
      customerId: user?.customerId,
      selectedPaymentId: user?.selectedPaymentId
    }
  }
}

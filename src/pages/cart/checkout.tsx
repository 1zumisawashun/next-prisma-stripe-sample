import { NextPage, GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { PaymentIntent } from '@stripe/stripe-js'
import { getSession } from 'next-auth/react'
import { getStripe } from '@/functions/libs/stripejs'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'
import { Layout } from '@/components/layouts/Layout'
import * as config from '@/functions/constants/config'
import { CartCheckout } from '@/features/cart'
import prisma from '@/functions/libs/prisma'

const Page: NextPage<{
  customerId: string | null
  selectedPaymentId: string | null
}> = ({ customerId, selectedPaymentId }) => {
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
              customerId={customerId}
              paymentIntent={paymentIntent}
              selectedPaymentId={selectedPaymentId}
            />
          </Elements>
        ) : (
          <p>Loading...</p>
        )}
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

  return {
    props: {
      customerId: user?.customerId,
      selectedPaymentId: user?.selectedPaymentId
    }
  }
}

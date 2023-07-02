import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { PaymentIntent } from '@stripe/stripe-js'
import { getStripe } from '@/functions/libs/stripejs'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'
import { Layout } from '@/components/layouts/Layout'
import * as config from '@/functions/constants/config'
import ElementsForm from '@/features/stripeElement/ElementsForm'

const Page: NextPage = () => {
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null)

  const asyncFunc = async () => {
    const res = await fetchPostJSON('/api/payment_intents', {
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
            <ElementsForm paymentIntent={paymentIntent} />
          </Elements>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </Layout>
  )
}

export default Page

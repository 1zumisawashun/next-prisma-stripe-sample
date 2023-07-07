import { Elements } from '@stripe/react-stripe-js'
import { MypagePaymentCreateForm } from '@/features/mypage'
import { getStripe } from '@/functions/libs/stripejs'

export default function page() {
  const stripe = getStripe()
  return (
    <Elements stripe={stripe}>
      <MypagePaymentCreateForm />
    </Elements>
  )
}

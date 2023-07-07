import { Elements } from '@stripe/react-stripe-js'
import { MypagePaymentCreateForm } from '@/features/mypage'
import { getStripe } from '@/functions/libs/stripejs'

export default function page() {
  console.log(getStripe(), 'getStripe()')
  return (
    <Elements stripe={getStripe()}>
      <MypagePaymentCreateForm />
    </Elements>
  )
}

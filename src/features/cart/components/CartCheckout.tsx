import { PaymentIntent } from '@stripe/stripe-js'
import { useShoppingCart } from 'use-shopping-cart'
import { Address } from '@prisma/client'
import Router from 'next/router'
import { fetchPostJSON } from '@/functions/helpers/api-helpers'
import { Button, ButtonLink } from '@/components/uis'
import { StripePaymentMethod } from '@/functions/libs/stripe'
import { CartCheckoutTable, CartProductTable } from '@/features/cart'

type ElementsFormProps = {
  payment: StripePaymentMethod | null
  address: Address | null
  customerId: string | null
  paymentIntent?: PaymentIntent | null
  selectedPaymentId: string | null
}

export const CartCheckout: React.FC<ElementsFormProps> = ({
  payment,
  address,
  customerId,
  paymentIntent = null,
  selectedPaymentId
}) => {
  const { cartDetails, totalPrice, formattedTotalPrice, clearCart } =
    useShoppingCart()

  const fullAddress = address
    ? `${address.postal_code}\n${address.state} ${address.city} ${address.line1}\n${address.line2}`
    : '未選択'

  const fullPayment = payment
    ? `＊＊＊＊＊＊＊＊＊${payment.card?.last4}`
    : '未選択'

  const items = [
    { title: 'お支払い金額', body: formattedTotalPrice, href: '/cart' },
    { title: 'お支払い方法', body: fullPayment, href: '/mypage/payment' },
    { title: 'お届け住所', body: fullAddress, href: '/mypage/address' }
  ]

  const handleCheckout = async () => {
    const payment_intent_update = await fetchPostJSON(
      '/api/stripe/payment_intents/update',
      {
        customer_id: customerId,
        amount: totalPrice,
        payment_intent_id: paymentIntent?.id
      }
    )
    console.log(payment_intent_update, 'payment_intent_update')

    const payment_intent_confirm = await fetchPostJSON(
      '/api/stripe/payment_intents/confirm',
      {
        payment_intent_id: paymentIntent?.id,
        selectedPaymentId
      }
    )

    console.log(payment_intent_confirm, 'payment_intent_confirm')

    // FIXME:このタイミングで「order model」に情報を追加する
    clearCart()
    Router.push('/cart/thankyou')
  }

  return (
    <div className="grid gap-10">
      <CartProductTable />
      <CartCheckoutTable items={items} />
      <div className="flex justify-center gap-5">
        <ButtonLink href="/cart">Back</ButtonLink>
        <Button onClick={handleCheckout}>購入する</Button>
      </div>
    </div>
  )
}

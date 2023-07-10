import { StripePaymentMethod } from '@/functions/libs/stripe'
import { LabelButton } from '@/components/uis'

type Props = {
  onClick: (id: string) => void
  selectedPaymentId: string | null
  payment_methods: StripePaymentMethod[]
}
export const MypagePaymentTable = ({
  onClick,
  selectedPaymentId,
  payment_methods
}: Props) => {
  console.log(payment_methods, 'payment_methods')
  return (
    <table className="w-full table-auto">
      <tbody className="divide-y divide-slate-100 text-sm font-medium">
        {payment_methods.map((payment) => (
          <tr
            key={payment.id}
            className="group cursor-pointer text-center transition-colors hover:bg-gray-100"
          >
            <td className="w-1/6 p-3">
              <img
                className="rounded-lg"
                src="https://placehold.jp/120x80.png"
                alt=""
              />
            </td>
            <td className="w-3/6 p-3">
              <p className="font-medium text-gray-600">
                ＊＊＊＊＊＊＊＊＊{payment.card?.last4}
              </p>
            </td>
            <td className="w-1/6 p-3">
              <p className="font-medium text-gray-600">
                {`${payment.card?.exp_year} / ${payment.card?.exp_month}`}
              </p>
            </td>
            <td className="w-1/6 p-3 text-center font-medium">
              <LabelButton
                type={payment.id === selectedPaymentId ? 'selected' : 'default'}
                onClick={() => onClick(payment.id)}
              >
                {payment.id === selectedPaymentId ? '選択済み' : '未選択'}
              </LabelButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

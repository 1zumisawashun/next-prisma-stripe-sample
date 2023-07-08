import { StripePaymentMethod } from '@/functions/libs/stripe'

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
  return (
    <table className="w-full table-auto">
      <tbody className="divide-y divide-slate-100 text-sm font-medium">
        {payment_methods.map((payment) => (
          <tr
            key={payment.id}
            className="group cursor-pointer transition-colors hover:bg-gray-100"
          >
            <td className="py-4 pl-10">
              <p className="font-medium text-gray-600">
                *************{payment.card?.last4}
              </p>
            </td>

            <td className="text-center font-medium">
              {payment.id === selectedPaymentId ? (
                <span
                  aria-hidden="true"
                  onClick={() => onClick(payment.id)}
                  className="mr-2 cursor-pointer rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-200 dark:text-green-900"
                >
                  選択済み
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  onClick={() => onClick(payment.id)}
                  className="mr-2 cursor-pointer rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-200 dark:text-red-900"
                >
                  未選択
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

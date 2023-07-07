import { Address } from '@prisma/client'

type Props = {
  list_payment_methods: any[]
}
export const MypagePaymentTable = ({ list_payment_methods }: Props) => {
  console.log(list_payment_methods, 'list_payment_methods')
  return (
    <table className="w-full table-auto">
      <tbody className="divide-y divide-slate-100 text-sm font-medium">
        {/* {addresses.map((address) => (
          <tr
            key={address.id}
            className="group cursor-pointer transition-colors hover:bg-gray-100"
          >
            <td className="py-4 pl-10">
              <p className="font-medium text-gray-600">
                {address.postal_code} <br />
                {address.state} {address.city} {address.line1} <br />
                {address.line2}
              </p>
            </td>

            <td className="text-center font-medium">
              {address.id === selectedAddressId ? (
                <span
                  aria-hidden="true"
                  onClick={() => onClick(address)}
                  className="mr-2 cursor-pointer rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-200 dark:text-green-900"
                >
                  選択済み
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  onClick={() => onClick(address)}
                  className="mr-2 cursor-pointer rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800 dark:bg-red-200 dark:text-red-900"
                >
                  未選択
                </span>
              )}
            </td>
          </tr>
        ))} */}
      </tbody>
    </table>
  )
}

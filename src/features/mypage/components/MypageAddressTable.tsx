import { Address } from '@prisma/client'

export const MypageAddressTable = ({
  addresses,
  onClick
}: {
  addresses: Address[]
  onClick: (address: Address) => void
}) => {
  return (
    <table className="w-full table-auto">
      <tbody className="divide-y divide-slate-100 text-sm font-medium">
        {addresses.map((address) => (
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
              {address.isAddressSelected && (
                <span
                  aria-hidden="true"
                  onClick={() => onClick(address)}
                  className="mr-2 cursor-pointer rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-200 dark:text-green-900"
                >
                  SELECTED
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

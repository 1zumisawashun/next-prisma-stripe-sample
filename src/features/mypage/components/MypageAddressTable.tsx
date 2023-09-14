import { Address } from '@prisma/client'
import { LabelButton } from '@/components'

type Props = {
  addresses: Address[]
  selectedAddressId: number | undefined
  onClick: (address: Address) => void
}
export const MypageAddressTable = ({
  addresses,
  selectedAddressId,
  onClick
}: Props) => {
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
              <LabelButton
                tag="button"
                type="button"
                labelType={
                  address.id === selectedAddressId ? 'selected' : 'default'
                }
                onClick={() => onClick(address)}
              >
                {address.id === selectedAddressId ? '選択済み' : '未選択'}
              </LabelButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

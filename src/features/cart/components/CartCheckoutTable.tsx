import Router from 'next/router'

type Props = {
  items: { title: string; href: string; body?: string }[]
}
export const CartCheckoutTable = ({ items }: Props) => {
  return (
    <table className="w-full table-auto">
      <tbody className="divide-y divide-slate-100 text-sm font-medium">
        {items.map((item) => (
          <tr className="group cursor-pointer transition-colors hover:bg-gray-100">
            <td className="w-2/6 p-3">
              <p className="text-gray-600">{item.title}</p>
            </td>

            <td className="w-3/6 whitespace-pre-line p-3 text-gray-600">
              {item.body}
            </td>

            <td className="text-center font-medium">
              <span
                aria-hidden="true"
                onClick={() => Router.push(item.href)}
                className="mr-2 cursor-pointer rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-200 dark:text-green-900"
              >
                変更する
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import Router from 'next/router'

export const CartProductTable: React.FC = () => {
  const { incrementItem, decrementItem, cartDetails } = useShoppingCart()

  const items = Object.values(cartDetails ?? [])

  return (
    <table className="w-full table-auto">
      <tbody className="divide-y divide-slate-100  text-sm font-medium">
        {items.map((product) => (
          <tr
            key={product.id}
            className="group  transition-colors hover:bg-gray-100"
          >
            <td className="w-2/6 p-3">
              <img
                className="rounded-lg"
                src={product?.image ?? 'https://placehold.jp/400x250.png'}
                alt={product.name}
              />
            </td>
            <td className="w-4/6 p-3">
              <div>
                <p
                  aria-hidden="true"
                  onClick={() => Router.push(`/books/${product.id}`)}
                  className="cursor-pointer text-lg font-semibold text-gray-700"
                >
                  {product.name}
                </p>
                <div className="font-medium text-gray-400">
                  {`${formatCurrencyString({
                    value: product.price,
                    currency: product.currency
                  })} × ${product.quantity}個`}
                </div>
              </div>
            </td>
            <td className="w-1/6 p-3">
              <div className="grid gap-5 text-center">
                <span
                  onClick={() => incrementItem(product.id)}
                  aria-hidden="true"
                  className="cursor-pointer rounded bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800"
                >
                  INCREMENT
                </span>
                <span
                  onClick={() => decrementItem(product.id)}
                  aria-hidden="true"
                  className="cursor-pointer rounded bg-red-100 px-2.5 py-0.5 text-sm font-medium text-red-800"
                >
                  DECREMENT
                </span>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

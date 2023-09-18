import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import Router from 'next/router'
import { Button } from '@/components'

export const CartProductTable: React.FC = () => {
  const { incrementItem, decrementItem, cartDetails } = useShoppingCart()

  const items = Object.values(cartDetails ?? [])

  const priceString = (product: any) => {
    const { price, currency, quantity } = product
    return `${formatCurrencyString({
      value: price,
      currency
    })} × ${quantity}個`
  }

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
                  className="cursor-pointer text-lg font-semibold text-gray-700 line-clamp-1"
                >
                  {product.name}
                </p>
                <div className="font-medium text-gray-400">
                  {priceString(product)}
                </div>
              </div>
            </td>
            <td className="w-1/6 p-3">
              <div className="grid gap-5 text-center">
                <Button size="small" onClick={() => incrementItem(product.id)}>
                  INCREMENT
                </Button>
                <Button size="small" onClick={() => decrementItem(product.id)}>
                  DECREMENT
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

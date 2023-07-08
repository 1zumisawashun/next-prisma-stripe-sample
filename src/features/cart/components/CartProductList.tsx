import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import { Button } from '@/components/uis/Button'

export const CartProductList = () => {
  const { addItem, removeItem, cartDetails } = useShoppingCart()

  const items = Object.values(cartDetails ?? [])
  return (
    <section>
      {items.map((product) => (
        <div key={product.id}>
          <img
            src={product?.image ?? 'https://placehold.jp/400x250.png'}
            alt={product.name}
          />
          <h2>{product.name}</h2>
          <p>
            {formatCurrencyString({
              value: product.price,
              currency: product.currency
            })}
          </p>
          <div>
            <Button onClick={() => addItem(product)}>Add to cart</Button>
            <Button onClick={() => removeItem(product.id)}>Remove</Button>
          </div>
        </div>
      ))}
    </section>
  )
}

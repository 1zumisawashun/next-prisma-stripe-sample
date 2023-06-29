import { formatCurrencyString, useShoppingCart } from 'use-shopping-cart'
import products from '../../functions/constants/products'
import { Button } from '../../components/uis/Button'

const Products = () => {
  const { addItem, removeItem } = useShoppingCart()

  return (
    <section className="products">
      {products.map((product) => (
        <div key={product.id} className="product">
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p className="price">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency
            })}
          </p>
          <div className="btn-wrapper">
            <Button onClick={() => addItem(product)}>Add to cart</Button>
            <Button onClick={() => removeItem(product.id)}>Remove</Button>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Products

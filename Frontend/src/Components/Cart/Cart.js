import React, { useContext } from 'react'
import { CartContext } from '../../Hooks/CartHook'
import Title from '../Title/Title'
import { Link } from 'react-router-dom'
import Price from '../Price/Price'
import '../Cart/Cart.css'
import NotFound from '../NotFound/NotFound'

const Cart = () => {
  const { cart, removeFromCart, changeQuantity } = useContext(CartContext);
  return (
    <>
      <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

      {cart.items.length === 0 ? (
        <NotFound message="Cart Page Is Empty!" />
      ) : (
        <div className='cart-container'>
          <ul className='cart-list'>
            {cart.items.map(item => (
              <li key={item.food.id}>
                <div>
                  <img src={`${item.food.imageUrl}`} alt={item.food.name} />
                </div>
                <div>
                  <Link to={`/food/${item.food.id}`}>{item.food.name}</Link>
                </div>

                <div>
                  <select
                    value={item.quantity}
                    onChange={e => changeQuantity(item, Number(e.target.value))}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                </div>

                <div>
                  <Price price={item.price} />
                </div>

                <div>
                  <button
                    className='cart-remove-btn'
                    onClick={() => removeFromCart(item.food.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className='cart-checkout'>
            <div>
              <div className='cart-foods_count'>{cart.totalCount}</div>
              <div className='cart-total_price'>
                <Price price={cart.totalPrice} />
              </div>
            </div>

            <Link to="/checkout">Proceed To Checkout</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart
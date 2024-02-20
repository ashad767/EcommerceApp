import './cart-dropdown.styles.scss'

import Button from '../button/button.component'

import { useContext } from 'react'

import { CartContext } from '../../contexts/cart.context'

import CartItem from '../cart-item/cart-item.component.jsx'

const CartDropdown = () => {
  const { products } = useContext(CartContext)

  return (
    <div className='cart-dropdown-container'>
        <div className="cart-items">
            {products.map((product) => (
              <CartItem key={product.id} cartItem={product}/>
            ))}
        </div>
        <Button>Checkout</Button>
    </div>
  )
}

export default CartDropdown
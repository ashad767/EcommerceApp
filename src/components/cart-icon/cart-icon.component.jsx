import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'

import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'

const CartIcon = () => {
  const { open, count, setOpen } = useContext(CartContext)

  return (
    <div className='cart-icon-container' onClick={ () => setOpen(!open) }>
      <ShoppingIcon className='shopping-icon' />
      <div className='item-count'>{count}</div>
    </div>
  )
}

export default CartIcon
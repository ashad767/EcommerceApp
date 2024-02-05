import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import './cart-icon.styles.scss'

import React from 'react'

const CartIcon = () => {
  return (
    <div className='cart-icon-container'>
        <ShoppingIcon className='shopping-icon'/>
        <div className='item-count'>0</div>
    </div>
  )
}

export default CartIcon
import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
    const { products, total } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    Product
                </div>
                <div className='header-block'>
                    Description
                </div>
                <div className='header-block'>
                    Quantity
                </div>
                <div className='header-block'>
                    Price
                </div>
                <div className='header-block'>
                    Remove
                </div>
            </div>
            {products.map((product) => (
                <CheckoutItem key={product.id} product={product}/>
            ))}
            <span className='total'>
                Total: ${total}
            </span>
        </div>
    )
}

export default Checkout
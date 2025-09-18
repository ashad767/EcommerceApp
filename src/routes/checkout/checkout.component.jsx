import { useContext, useState } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';

import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '../../utils/stripe/stripe.utils';



const Checkout = () => {
    const { products, total } = useContext(CartContext);

    const options = {
        mode: 'payment',
        currency: 'usd',
        amount: total * 100,
    };

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
            {
                total > 0 && <Elements stripe={stripePromise} options={options}>
                    <PaymentForm amount={total * 100}/>
                </Elements>
            }
        </div>
    )
}

export default Checkout
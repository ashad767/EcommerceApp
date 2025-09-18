import { useContext, useState } from 'react'
import { CardElement, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'

import Button from '../button/button.component'
import BUTTON_TYPE_CLASSES from '../button/button.component'

import { PaymentFormContainer, FormContainer } from './payment-form.styles'

import { UserContext } from '../../contexts/user.context'
import { CartContext } from '../../contexts/cart.context'

const PaymentForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const { currentUser } = useContext(UserContext);
    const { clearCart } = useContext(CartContext);

    const paymentHandler = async (e) => {
        e.preventDefault();

        await elements.submit()

        if (!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount })
        }).then(res => res.json());

        const { paymentIntent: { client_secret }} = response;
        
        // const paymentResult = await stripe.confirmCardPayment(client_secret, {
        //     payment_method: {
        //         card: elements.getElement(CardElement),
        //         billing_details: {
        //             name: currentUser ? currentUser.displayName : 'Guest'
        //         }
        //     }
        // });

        const paymentResult2 = await stripe.confirmPayment({
            elements,
            clientSecret: client_secret,
            confirmParams: {
                return_url: 'http://localhost:3000/checkout'
            },
        });

        setIsProcessingPayment(false);

        if (paymentResult2.error) {
            alert("Payment failed, please try again!");
        }
        else {
            if (paymentResult2.paymentIntent.status === 'succeeded') {
                alert('Payment Successful!');
            }
            clearCart();
        }
    }

  return (
    <PaymentFormContainer>
        <FormContainer onSubmit={paymentHandler}>
            <h2>Credit Card Payment</h2>
            <br></br>
            <PaymentElement />
            <br></br>
            <Button disabled={amount == 0} isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>
                Pay Now
            </Button>
        </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm
import { Elements } from "@stripe/react-stripe-js"
import PaymentForm from "../payment-form/payment-form.component"

import { stripePromise } from "../../utils/stripe/stripe.utils";



const CheckoutForm = ({amount}) => {
    const options = {
        mode: 'payment',
        currency: 'usd',
        amount: amount + 10000,
    };

  return (
    <Elements stripe={stripePromise} options={options}>
        <PaymentForm/>
    </Elements>
  )
}

export default CheckoutForm
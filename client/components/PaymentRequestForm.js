import React from 'react';
import {PaymentRequestButtonElement, injectStripe} from 'react-stripe-elements';


class PaymentRequestForm extends React.Component {
    constructor(props) {
      super(props);
  
      // For full documentation of the available paymentRequest options, see:
      // https://stripe.com/docs/stripe.js#the-payment-request-object
      const paymentRequest = props.stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Demo total',
          amount: 1,
        },
      });
  
      paymentRequest.on('token', ({complete, token, ...data}) => {
        console.log('Received Stripe token: ', token);
        console.log('Received customer information: ', data);
        complete('success');
      });
  
      paymentRequest.canMakePayment().then((result) => {
        this.setState({canMakePayment: !!result});
        console.log('can make payment state', this.state)
      });
  
      this.state = {
        canMakePayment: false,
        paymentRequest,
      };
    }
    // componentDidUpdate() {
    //     !this.state.canMakePayment ? 
    //         this.paymentRequest.canMakePayment()
    //         : console.log('no paymentRequest')
    // }
  
    render() {
        console.log('state in payment request form', this.state)
      return this.state.canMakePayment ? (
        <PaymentRequestButtonElement
          paymentRequest={this.state.paymentRequest}
          className="PaymentRequestButton"
          style={{
            // For more details on how to style the Payment Request Button, see:
            // https://stripe.com/docs/elements/payment-request-button#styling-the-element
            paymentRequestButton: {
                type: 'buy',
              theme: 'light',
              height: '64px',
            },
          }}
        />
      ) : null;
    }
  }
  export default injectStripe(PaymentRequestForm);
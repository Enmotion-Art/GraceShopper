// import React from 'react';
// // import {injectStripe} from 'react-stripe-elements';

// // import AddressSection from './AddressSection';
// // import CardSection from './CardSection';
// import {
// 	CardElement,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCVCElement,
//   PostalCodeElement,
//   PaymentRequestButtonElement,
//   IbanElement,
//   IdealBankElement,
//   StripeProvider,
//   Elements,
//   injectStripe,
// } from 'react-stripe-elements'

// const handleBlur = () => {
//   console.log('[blur]');
// };
// const handleChange = (change) => {
//   console.log('[change]', change);
// };
// const handleClick = () => {
//   console.log('[click]');
// };
// const handleFocus = () => {
//   console.log('[focus]');
// };
// const handleReady = () => {
//   console.log('[ready]');
// };

// const createOptions = (fontSize, padding) => {
//   return {
//     style: {
//       base: {
//         fontSize,
//         color: '#424770',
//         letterSpacing: '0.025em',
//         fontFamily: 'Source Code Pro, monospace',
//         '::placeholder': {
//           color: '#aab7c4',
//         },
//         padding,
//       },
//       invalid: {
//         color: '#9e2146',
//       },
//     },
//   };
// };

// class _CardForm extends React.Component {
//   handleSubmit = (ev) => {
//     ev.preventDefault();
//     if (this.props.stripe) {
//       this.props.stripe
//         .createToken()
//         .then((payload) => console.log('[token]', payload));
//     } else {
//       console.log("Stripe.js hasn't loaded yet.");
//     }
//   };
//   render() {
//     return (
//       <form id='stripeForm' onSubmit={this.handleSubmit}>
//         <label>
//           Card details
//           <CardElement
//             onBlur={handleBlur}
//             onChange={handleChange}
//             onFocus={handleFocus}
//             onReady={handleReady}
//             {...createOptions(this.props.fontSize)}
//           />
//         </label>
//         <button type='button' id='stripeButton'>Pay</button>
//       </form>
//     );
//   }
// }
// export default injectStripe(_CardForm);






//////////////////////////////////////////////////////////////////////////////////////////////////
// class CheckoutForm extends React.Component {
//   handleSubmit = (ev) => {
//     // We don't want to let default form submission happen here, which would refresh the page.
//     ev.preventDefault();

//     // Within the context of `Elements`, this call to createToken knows which Element to
//     // tokenize, since there's only one in this group.
//     this.props.stripe.createToken({name: 'Jenny Rosen'}).then(({token}) => {
//       console.log('Received Stripe token:', token);
//     });

//     // However, this line of code will do the same thing:
//     //
//     // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

//     // You can also use createSource to create Sources. See our Sources
//     // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
//     //
//     // this.props.stripe.createSource({type: 'card', owner: {
//     //   name: 'Jenny Rosen'
//     // }});
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         {/* <AddressSection /> */}
//         <CardSection />
//         <button type='button'>Confirm order</button>
//       </form>
//     );
//   }
// }

// export default injectStripe(CheckoutForm);

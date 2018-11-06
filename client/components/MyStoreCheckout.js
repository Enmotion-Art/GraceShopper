import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { connect } from 'react-redux'
import Axios from 'axios';
import { putOrder, postOrder } from '../store/order'

class MyStoreCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {complete: false};
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});

    let response = await Axios.post("/api/orders/charge", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: token.id,
      price: (this.props.price*100),
      order: this.props.orderId
    });

    if(!this.props.user.id) {
      let productArr = JSON.parse(localStorage.getItem('product'));
      let productIds = productArr.map(product => product.id)
      this.props.createOrder(productIds, this.props.orderInfo, null, 'confirmation')
    } else {
      this.props.updateOrder('processing', this.props.order.id, this.props.orderInfo, "confirmation");
    }

    if (response.statusText === 'OK') {
      this.setState({complete: true})
    };
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit} id='stripeButton' type="button">Pay Now</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.singleUser,
  order: state.order.singleOrder
})

const mapDispatchToProps = (dispatch) => ({
  updateOrder: (status, id, orderInfo, page, productIds) => dispatch(putOrder(status, id, orderInfo, page, productIds)),
  createOrder: (product, orderInfo, user, page) => dispatch(postOrder(product, orderInfo, user, page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(injectStripe(MyStoreCheckout));

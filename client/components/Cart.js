import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { postOrder } from '../store/order'
import { me } from '../store/user'


class Cart extends Component {
  constructor() {
    super()
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
    this.props.getMeAgain();
  }

  handleCheckout() {
    let userId = null;
    if(this.props.user.id) {
      userId = this.props.user.id;
    }
    let product = JSON.parse(localStorage.getItem('product'));
    let productId = product.id;
    this.props.createOrder({ productId, userId})
  }

  render() {
    console.log("USER IN CART", this.props.user)
    let products = JSON.parse(localStorage.getItem('product'))
    if(!products) {
      return (
        <p>Your cart is empty.</p>
      )
    } else {
      return (
        <div className='grid'>
          <br />
          <h1>Your Cart</h1>
          <div id="container-row">
            <div id="column">
              <img id="cart-image" src = {products.image} />
            </div>
            <div id="second-column">
              <p>{products.description}</p>
              <p>Style: {products.category}</p>
              <p>{products.width}W x {products.height}H</p>
              <p><strong>${products.price}</strong></p>
              { products.quantity === 0 ? <p>Nothing in your cart!</p> :
              <button type="submit" onClick={this.handleCheckout}>Checkout</button> }
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => ({
  createOrder: (art) => dispatch(postOrder(art)),
  getMeAgain: () => dispatch(me())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))

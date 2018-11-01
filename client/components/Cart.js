import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchSingleArt, removeArt } from '../store/art'
import { postOrder } from '../store/order'

class Cart extends Component {
  constructor() {
    super()
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  handleCheckout() {
    this.props.createOrder(JSON.parse(localStorage.getItem('product')))
  }

  render() {
    const cart = JSON.parse(localStorage.getItem('product'))
    console.log('this.props AGAIN', this.props)
    if(!cart) {
      return (
        <p>Your cart is empty.</p>
      )
    } else {
      return (
        <div>
          <br />
          <h1>{cart.title}</h1>
          <div id="container-row">
            <div id="column">
              <img src = {cart.image} />
            </div>
            <div id="second-column">
              <p>{cart.description}</p>
              <p>Style: {cart.category}</p>
              <p>{cart.width}W x {cart.height}H</p>
              <p><strong>${cart.price}</strong></p>
              { cart.quantity === 0 ? <p>Nothing in your cart!</p> :
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
  createOrder: (art) => dispatch(postOrder(art))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))

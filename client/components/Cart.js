import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { postOrder, putOrder, fetchSingleOrder } from '../store/order'
import { me } from '../store/user'
import history from '../history'
import CartItem from './CartItem'

class Cart extends Component {
  constructor() {
    super()
    this.handleCheckout = this.handleCheckout.bind(this)
  }

  componentDidMount() {
    this.props.getMeAgain();
  }

  handleCheckout() {
    history.push('/checkout')
  }

  render() {
    let productArr;
    if(this.props.user.id) {
      productArr = this.props.user.orders.find(order => order.status === 'created')
      if(productArr) {
        productArr = productArr.arts;
      }
    } else {
      productArr =  JSON.parse(localStorage.getItem('product'));
      if(productArr) {
        productArr = productArr.slice(1)
      }
    }

    let productObj = {}
    if(productArr) {
      productArr.forEach(product => {
        if(productObj[product.id]) {
          productObj[product.id] = productObj[product.id]+=1;
        } else {
          productObj[product.id] = 1;
        }
      })
    }
    let productKeys = Object.keys(productObj);

    if(!productArr) {
      return (
        <p>Your cart is empty.</p>
      )
    } else {
      return (
        <div className='grid'>
          <br />
          <h1>Your Cart</h1>
          {productKeys.map(key =>
            <CartItem product={productArr.find(product => product.id === +key)} key={+key} handleCheckout={this.handleCheckout} quantity={productObj[key]} />
          )}
          <button type="submit" onClick={this.handleCheckout}>Checkout</button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.singleUser,
    order: state.order.singleOrder
  }
}

const mapDispatchToProps = dispatch => ({
  createOrder: (product, page ) => dispatch(postOrder(product, page)),
  getUserOrder: (id) => dispatch(fetchSingleOrder(id)),
  getMeAgain: () => dispatch(me()),
  editOrder: (status, id, orderInfo, page, prodIds) => dispatch(putOrder(status, id, orderInfo, page, prodIds))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))

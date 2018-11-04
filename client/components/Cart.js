import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { me } from '../store/user'
import history from '../history'
import CartItem from './CartItem'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: props.order,
      quantity: '',
      refresh: false
    }
    this.handleCheckout = this.handleCheckout.bind(this)
    this.triggerRefresh = this.triggerRefresh.bind(this)
  }

  triggerRefresh() {
    this.setState({
      refresh: !this.state.refresh
    })
  }

  componentDidMount() {
    this.props.getMeAgain()
  }

  handleCheckout() {
    history.push('/checkout')
  }

  render() {
    console.log("USER IN CART", this.props.user)
    console.log("ORDER ON STATE IN CART", this.props.order)
    let productArr;
    if(this.props.user.id) {
      productArr = this.props.order.arts;
    } else {
      productArr = JSON.parse(localStorage.getItem('product'));
    }

    let productObj = {}
    let total = 0;
    if (productArr) {
      productArr.forEach(product => {
        if (productObj[product.id]) {
          productObj[product.id] = productObj[product.id] += 1;
        } else {
          productObj[product.id] = 1;
        }
      })
    }
    let productKeys = Object.keys(productObj);

    if (!productArr || !productArr.length) {
      return (
        <p>Your cart is empty.</p>
      )
    } else {
      return (
        <div className='grid'>
          <br />
          <h1>Your Cart</h1>
          {productKeys.map(key => {
            let product = productArr.find(prod => prod.id === +key);
            let quantity;
            if(this.props.user.id) {
              quantity = product.cart.quantity;
            } else {
              quantity = productObj[key];
            }
            total += product.price * quantity;

            return <div key={+key} id="container-row">
              <div>
                <CartItem product={product} quantity={quantity} refresh={this.triggerRefresh}/>
                </div>
              </div>
            }
          )}
          <div>
            <strong>Total: </strong>${total}
          </div>
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
  // createOrder: (product, page) => dispatch(postOrder(product, page)),
  getMeAgain: () => dispatch(me()),
  // editOrder: (status, id, orderInfo, page, prodIds) => dispatch(putOrder(status, id, orderInfo, page, prodIds)),
  // changeProduct: (orderId, productId, quantity) => dispatch(changeOrderProduct(orderId, productId, quantity)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))

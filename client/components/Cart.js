import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { postOrder, putOrder, fetchSingleOrder, deleteOrderProduct } from '../store/order'
import { me } from '../store/user'
import history from '../history'
import CartItem from './CartItem'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: props.order
    }
    this.handleCheckout = this.handleCheckout.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidMount() {
    this.props.getMeAgain()
  }

  handleCheckout() {
    history.push('/checkout')
  }

  delete(id) {
    if(this.props.user.id) {
      this.props.removeProduct(this.props.order.id, id)
    } else {
      let productArr = JSON.parse(localStorage.getItem('product'));
      console.log("PRODUCT ARR IN DELETE", productArr)
      let oneLessItem = productArr.filter(product => product.id !== id);
      if(!oneLessItem.length) {
        localStorage.removeItem('product')
      } else {
        localStorage.setItem('product', JSON.stringify(oneLessItem));
      }
    }

    this.setState({
      order: this.props.order
    })
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
                <CartItem product={product} quantity={quantity}   allItems={productArr} />
                <div id="second-column">
                  <button onClick={() => this.delete(product.id)}>Delete Item</button>
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
  createOrder: (product, page) => dispatch(postOrder(product, page)),
  getUserOrder: (id) => dispatch(fetchSingleOrder(id)),
  getMeAgain: () => dispatch(me()),
  editOrder: (status, id, orderInfo, page, prodIds) => dispatch(putOrder(status, id, orderInfo, page, prodIds)),
  removeProduct: (orderId, productId) => dispatch(deleteOrderProduct(orderId, productId)),
  // fetchUserOrder: (id) => dispatch(fetchUserOrder(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))

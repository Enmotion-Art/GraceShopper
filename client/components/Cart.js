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
      refresh: false
    }
    this.triggerRefresh = this.triggerRefresh.bind(this)
  }

  componentDidMount() {
    this.props.getMeAgain()
  }

  triggerRefresh() {
    this.setState({
      refresh: !this.state.refresh
    })
  }

  render() {
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
        <p className='main-container & yellow'>Your cart is empty.</p>
      )
    } else {
      return (
        <div className='main-container'>
          <br />
          <h1 className='yellow'>Your Cart</h1>
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
                <CartItem product={product} quantity={quantity} refresh={this.triggerRefresh} />
                </div>
              </div>
            }
          )}
          <div className='red'>
            <strong className='yellow'>Total: </strong>${total}
          </div>
          <button type="submit" onClick={() => history.push('/checkout')} id='stripeButton' type="button">Checkout</button>
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
  getMeAgain: () => dispatch(me()),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))

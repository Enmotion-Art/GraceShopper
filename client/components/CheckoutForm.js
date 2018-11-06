import React from 'react'
import { connect } from 'react-redux'
import { putOrder, postOrder } from '../store/order'
import {StripeProvider} from 'react-stripe-elements'

import MyStoreCheckout from './MyStoreCheckout'

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: props.user.firstName || '',
      lastName: 'Smith',
      email: props.user.email || '',
      streetNum: '11',
      street: "Main Street",
      city: "NYC",
      state: "NY ",
      zip: '11102',
      cc: '123456781234',
      sc: '123',
      validate: true,
      promo: '',
      subtotal: this.calculatePrice(),
      promoVal: "true",
      orderObj: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.promoChange = this.promoChange.bind(this);
    this.promoSubmit = this.promoSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  promoChange(e) {
    this.setState({
      promo: e.target.value,
    })
  }

  promoSubmit(e) {
    e.preventDefault();
    if(this.state.promo.toLowerCase() === 'luigiwuzhurr') {
      let newPrice = String(Math.floor(this.calculatePrice()/2))
      this.setState({
        subtotal: newPrice,
        promoVal: 'valid'
      })
    } else {
      this.setState({
        promoVal: 'false',
        promo: '',
      })
    }
  }

  calculatePrice() {
    let subtotal = 0;
    if(this.props.user.id) {
      this.props.order.arts.forEach(product =>
        {subtotal += (product.price * product.cart.quantity);
        return subtotal })
    } else {
      let products = JSON.parse(localStorage.getItem('product'));
      products.forEach(product => subtotal += +product.price)
    }
    return subtotal;
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({
      promoVal: 'true'
    })

    let orderObj = {};
    for(let key in this.state ) {
      if(key !== 'validate' && key !=='promoVal' && key !== 'promo' && key!== 'orderObj') {
        orderObj[key] = String(this.state[key]).trim();
      }
    }

    let allNotNull = true;
    for(let key in orderObj) {
      if(orderObj[key] === null || orderObj[key] === '') {
        allNotNull = false;
      }
    }

    if(allNotNull) {
      // if(!this.props.user.id) {
      //   let productArr = JSON.parse(localStorage.getItem('product'));
      //   let productIds = productArr.map(product => product.id)
      //   this.props.createOrder(productIds, orderObj, null, 'confirmation')
      // } else {
      //   this.props.updateOrder('processing', this.props.order.id, orderObj, "confirmation");
      // }
      this.setState({
        orderObj: orderObj,
        validate: true
      })
    } else {
      this.setState({
        validate: false,
        promoVal: 'true'
      })
    }
  }

  render() {
    return (
      <div className="main-container">
      <div className='container'>
        <div>
          <h3>Customer Information</h3>
          <form className="form-inline">
              <label> First Name: </label>
              <input type="text" name="firstName" onChange={this.handleChange} value={this.state.firstName}  />

              <label> Last Name: </label>
              <input type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName} />

              <label> Email: </label>
              <input type="text" name="email" onChange={this.handleChange} value={this.state.email} />

              <label> Street Number: </label>
              <input type="text" name="streetNum" onChange={this.handleChange} value={this.state.streetNum} />

              <label> Street: </label>
              <input type="text" name="street" onChange={this.handleChange} value={this.state.street} />

              <label> City: </label>
              <input type="text" name="city" onChange={this.handleChange} value={this.state.city} />

              <label> State: </label>
              <input type="text" name="state" onChange={this.handleChange} value={this.state.state} />

              <label> Zip Code: </label>
              <input type="text" name="zip" onChange={this.handleChange} value={this.state.zip} />
          </form>
        </div>

        <div>
            <br />
              <h3>Promo Code</h3>
              <input type="text" name="promo" onChange={this.promoChange} value={this.state.promo} />

              {this.state.promoVal === 'false' ?
              <p style={{color:'blue'}}>Invalid promo code.</p>
              : this.state.promoVal === 'valid' ?
              <p style={{color:'blue'}}>Promo code applied.</p> : <p />}

              <button type="submit" onClick={this.promoSubmit}>Apply Promo</button>

              { JSON.parse(localStorage.getItem('product')) || this.props.order.id ?
              <h3>Total to Charge: ${this.state.subtotal}</h3>
              : <p /> }
              <button type="submit" onClick={this.handleSubmit}>Enter Payment Info</button>

              {!this.state.validate ?
              <p style={{color:'red'}}>Please complete all fields.</p>
              : '' }
          </div>
        </div>
        {this.state.orderObj.firstName ?
            <div className="container">
                <h3>Payment Information</h3>
                <StripeProvider apiKey="key">
                  <MyStoreCheckout />
                </StripeProvider>
            </div> : <div />}
      </div>
      )
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)

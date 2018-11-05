import React from 'react'
import { connect } from 'react-redux'
import { putOrder, postOrder } from '../store/order'

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
      hidden: true,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
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
    let orderObj = {};
    for(let key in this.state ) {
      if(key !== 'hidden') {
        orderObj[key] = this.state[key].trim();
      }
    }

    let allNotNull = true;
    for(let key in orderObj) {
      if(orderObj[key] === null || orderObj[key] === '') {
        allNotNull = false;
      }
    }

    orderObj.subtotal = this.calculatePrice()

    if(allNotNull) {
      if(!this.props.user.id) {
        let productArr = JSON.parse(localStorage.getItem('product'));
        let productIds = productArr.map(product => product.id)
        this.props.createOrder(productIds, orderObj, null, 'confirmation')
      } else {
        this.props.updateOrder('processing', this.props.order.id, orderObj, "confirmation");
      }
    } else {
      this.setState({
        hidden: false
      })
    }
  }

  render() {
    return (
      <div className='grid' id="container-row">
        <div className='grid-child'>
          <form>
              <h3>Customer Information</h3>

              {!this.state.hidden ?
              <p style={{color:'red'}}>Please complete all fields.</p>
              : '' }

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
        <div className='grid-child' id="second-column">
          <form>
            <h3>Payment Information</h3>
            <label> Credit Card Number: </label>
            <input type="text" name="cc" onChange={this.handleChange} value={this.state.cc} />

            <label> Security Code: </label>
            <input type="text" name="sc" onChange={this.handleChange} value={this.state.sc} />
          </form>
          <div>
            <div>
              { JSON.parse(localStorage.getItem('product')) || this.props.order.id ?
              <p><strong>Total to Charge: ${this.calculatePrice()}</strong></p>
              : <p /> }
              <button type="submit" onClick={this.handleSubmit}>Place your order</button>
            </div>
          </div>
        </div>
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

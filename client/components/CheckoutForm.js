import React from 'react'
import { connect } from 'react-redux'
import { putOrder, postOrder } from '../store/order'

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: props.user.firstName || '',
      lastName: props.user.lastName || '',
      email: props.user.email || '',
      streetNum: props.streetNum || '',
      street: props.street || '',
      city: props.city || '',
      state: props.state || '',
      zip: props.zip || '',
      cc: '',
      sc: '',
      hidden: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let order = this.props.order;
    let orderObj = {};
    let userId = null;

    for(let key in this.state ) {
      let value = this.state[key]
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
    if(allNotNull) {
      this.setState({
        hidden: true
      })
      let productArr;
      if(!this.props.user.id) {
        productArr = JSON.parse(localStorage.getItem('product')).slice(1);
      } else {
        productArr = this.props.user.orders.find(order => order.status === 'created').arts;
      }
      let productIds = productArr.map(product => product.id)

      if(!this.props.user.id) {
        this.props.createOrder(productIds, orderObj, userId, 'confirmation')
      } else {
        this.props.updateOrder('processing', order.id, orderObj, "confirmation", productIds);
      }
    } else {
      this.setState({
        hidden: false
      })
    }
  }

  render() {
    let order = JSON.parse(localStorage.getItem('product'));
    console.log("ORDER ON STATE", this.props.order)
    return (
      <div id="container-row">
        <div>
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

              <p><strong>Subtotal: $XXX</strong></p>
          </form>
        </div>
        <div id="second-column">
          <form>
            <h3>Payment Information</h3>
            <label> Credit Card Number: </label>
            <input type="text" name="cc" onChange={this.handleChange} value={this.state.cc} />

            <label> Security Code: </label>
            <input type="text" name="sc" onChange={this.handleChange} value={this.state.sc} />

          </form>
        </div>
        <div>
          <div id="second-column">
            {/* <h3>Order Information</h3>
            <p><strong>Item</strong>: {order.title}</p>
            <p><strong>Quantity</strong>: {order.quantity}</p>
            <p><strong>Price</strong>: {order.price}</p> */}
            <button type="submit" onClick={this.handleSubmit}>Place your order</button>
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
  createOrder: (product, orderInfo, user, page) => dispatch(postOrder(product, orderInfo, user, page))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)

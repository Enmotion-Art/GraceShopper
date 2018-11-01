import React from 'react'
import { connect } from 'react-redux'
import { putOrder } from '../store/order'

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
      sc: ''
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
    let submittedOrder = JSON.parse(localStorage.getItem('order'));
    this.props.updateOrder('processing', submittedOrder.id)
  }

  render() {
    console.log("USER IN CHECKOUT", this.props.user)

    // let order;
    // if(!this.props.user.id) {
      let order = JSON.parse(localStorage.getItem('product'));
    // } else {
    //   order = this.props.user.orders[0]
    // }
    return (
      <div className='grid' id="container-row">
        <div className='grid-child'>
          <form>
              <h3>Customer Information</h3>

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
        <div className='grid-child' id="second-column">
          <form>
            <h3>Payment Information</h3>
            <label> Credit Card Number: </label>
            <input type="text" name="cc" onChange={this.handleChange} value={this.state.cc} />

            <label> Security Code: </label>
            <input type="text" name="sc" onChange={this.handleChange} value={this.state.sc} />

          </form>
        </div>
        <div className='grid-child'>
          <div id="second-column">
            <h3>Order Information</h3>
            <p><strong>Item</strong>: {order.title}</p>
            <p><strong>Quantity</strong>: {order.quantity}</p>
            <p><strong>Price</strong>: {order.price}</p>
            <button type="submit" onClick={this.handleSubmit}>Place your order</button>
          </div>
        </div>
      </div>
      )
    }
  }

const mapStateToProps = (state) => ({
  user: state.user,
  order: state.order.singleOrder
})

const mapDispatchToProps = (dispatch) => ({
  updateOrder: (status, id) => dispatch(putOrder(status, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)

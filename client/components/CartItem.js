import React from 'react'
import { connect } from 'react-redux'

const CartItem = (props) => {
  console.log("ITEM PROPS", props)
  let quantity = props.quantity;

  return (
    <div id="container-row">
      <div id="column">
        <img id="cart-image" src = {props.product.image} />
      </div>
      <div id="second-column">
        <p>{props.product.description}</p>
        <p>Style: {props.product.category}</p>
        <p>{props.product.width}W x {props.product.height}H</p>
        <p><strong>${props.product.price}</strong></p>
        <p><strong>Quantity: </strong>{quantity}</p>
      </div>
  </div>
  )
}

const mapStateToProps = state => ({
  order: state.order.singleOrder,
  user: state.user.singleUser
})

export default connect(mapStateToProps)(CartItem)







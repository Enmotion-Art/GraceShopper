import React from 'react'
import ChangeQuantity from './ChangeQuantity'

const CartItem = (props) => {
  let quantity = props.quantity;
  return (
    <div className='grid-child' id="container-row">
      <div>
        <img id="cart-image" src = {props.product.image} />
      </div>
      <div id="flex-col" className='red'>
        <p>{props.product.description}</p>
        <p>Style: {props.product.category}</p>
        <p>{props.product.width}W x {props.product.height}H</p>
        <p><strong>${props.product.price}</strong></p>
        <div>
          <div>
            <p><strong>Quantity: </strong>{quantity}</p>
            <ChangeQuantity product={props.product} label="Update Quantity" quantity={quantity} refresh={props.refresh} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem







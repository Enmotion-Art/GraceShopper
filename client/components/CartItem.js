import React from 'react'
import { connect } from 'react-redux'
import { changeOrderProduct } from '../store/order'
import { me } from '../store/user';

class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: '',
      refresh: false
    }
    this.changeQuantity = this.changeQuantity.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({
      quantity: e.target.value,
    })
  }

  changeQuantity(id, quant) {
    if(!quant) {
      quant = this.state.quantity
    }
    if(this.props.user.id) {
      this.props.changeProduct(this.props.order.id, id, quant)
    } else {
      let products = JSON.parse(localStorage.getItem('product'));
      let productToChange = products.filter(product => product.id === id)
      let newProductList = products.filter(product => product.id !== id);
      if(quant < this.props.quantity) {
        productToChange = productToChange.slice(0, quant)
      } else {
        while(quant > this.props.quantity) {
          productToChange.push(productToChange[0])
          quant--;
        }
      }
      newProductList = [...newProductList, ...productToChange];
      localStorage.setItem('product', JSON.stringify(newProductList))
    }
    this.setState({
      quantity: ''
    })
    this.props.refresh();
  }

  render() {
    let quantity = this.props.quantity;
    return (
      <div className='grid-child' id="container-row">
        <div>
          <img id="cart-image" src = {this.props.product.image} />
        </div>
        <div id="flex-col" className='red'>
          <p>{this.props.product.description}</p>
          <p>Style: {this.props.product.category}</p>
          <p>{this.props.product.width}W x {this.props.product.height}H</p>
          <p><strong>${this.props.product.price}</strong></p>
          <div>
            <div>
              <p><strong>Quantity: </strong>{quantity}</p>
              <p><strong>Change Quantity: </strong>
                <input onChange={this.onChange} value={this.state.quantity}/>
                  <button onClick={() => this.changeQuantity(this.props.product.id)}>Update</button></p>
            </div>
          </div>
        </div>
        <div>
          <button onClick={() => this.changeQuantity(this.props.product.id, '0')}>Delete Item</button>
        </div>
    </div>
  )
  }
}

const mapStateToProps = state => ({
  order: state.order.singleOrder,
  user: state.user.singleUser
})

const mapDispatchToProps = dispatch => ({
  changeProduct: (orderId, productId, quantity) => dispatch(changeOrderProduct(orderId, productId, quantity)),
  getMeAgain: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)







import React from 'react'
import { connect } from 'react-redux'
import { putOrder } from '../store/order'
import { me } from '../store/user';

class ChangeQuantity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: '',
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
    console.log("ID PASSED IN", id)
    if(!quant) {
      quant = this.state.quantity
    }
    if(this.props.user.id) {
      this.props.editOrder('created', this.props.order.id, null, null, [this.props.product.id], quant)
    } else {
      quant === '' ? quant = 1 : quant;
      if (!JSON.parse(localStorage.getItem('product'))) {
        localStorage.setItem('product', JSON.stringify([this.props.product]))
      } else {
        let productArr = JSON.parse(localStorage.getItem('product'));
        let thisProd = productArr.filter(product => product.id === this.props.product.id)
        if(quant >= thisProd.length) {
          while(quant >= thisProd.length) {
          productArr.push(this.props.product);
          quant--
          }
        } else {
          thisProd = thisProd.slice(0, quant)
          let otherProds = productArr.filter(product => product.id !== id);
          productArr = [...otherProds, ...thisProd];
        }
        localStorage.setItem('product', JSON.stringify(productArr))
        if(productArr.length === 0) {
          localStorage.removeItem('product')
        }
      }
    }
    this.setState({
      quantity: ''
    })
    if(this.props.label === 'Update Quantity') {
      this.props.refresh()
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.props.label === "Add to Cart" ?
          <strong>Quantity: </strong>
          : <p/> }
          <select name="quantity" onChange={this.onChange} value={this.state.quantity}>
            <option />
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <button onClick={() => this.changeQuantity(this.props.product.id)}>{this.props.label}</button>
        </div>

        <div>
          {this.props.label === "Update Quantity" ?
          <button onClick={() => this.changeQuantity(this.props.product.id, '0')}>Delete Item</button>
          :
          <p/>}
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
  editOrder: function (status, id, page, orderInfo, productIds, quant) {
    dispatch(putOrder(status, id, page, orderInfo, productIds, quant))
  },
  getMeAgain: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangeQuantity)







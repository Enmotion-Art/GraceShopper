import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter, Link } from 'react-router-dom'
import { fetchSingleArt, removeArt } from '../store/art'
import { postOrder, putOrder } from '../store/order'


class SingleArt extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
    this.addtoCart = this.addtoCart.bind(this)
  }

  componentDidMount() {
    const id= this.props.match.params.artId
    this.props.actions.loadSingleArt(id)
    console.log('didMount')
  }

  handleClick(event) {
    event.preventDefault();
    const ArtId = event.target.id;
    this.props.actions.removeSpecificArt({ id: ArtId });
  }

  addtoCart(event) {
    event.preventDefault()

    if(!JSON.parse(localStorage.getItem('product'))) {
      let setter = [0]
      localStorage.setItem('product', JSON.stringify(setter))
    }
    let productArr = JSON.parse(localStorage.getItem('product'));
    productArr.push(this.props.singleArt)
    localStorage.setItem('product', JSON.stringify(productArr))

    //Load persistent cart for logged in user
    if(this.props.user.id) {
      let orders = this.props.user.orders;
      let productIds = productArr.slice(1).map(product => product.id)
      let userId =this.props.user.id

    //Check if this user has any past orders at all and if not, create a new order
      if(!orders.length) {
        this.props.actions.createOrder(productIds, null, userId, '')
      } else {
    //If there are past orders, see if any of them are a working order, i.e., cart. If there is one, add the product to the working order. If all past orders are complete, i.e., not carts, then create a new order.
        let created = orders.filter(order => order.status === 'created');
        if(created.length) {
          this.props.actions.editOrder('created', created[0].id, null, 'cart', productIds)
        } else {
          this.props.actions.createOrder(productIds, null, userId, 'cart')
        }
      }
    }
  }

  render() {
    console.log("USER IN SINGLE ART", this.props.user)
    console.log("ORDER ON STATE", this.props.order)

    const singleArt = this.props.singleArt
    const user = this.props.user
    return (
      <div>
        {
          user.UserType === 'admin' ?
          <div>
          <button type="button" id={`${singleArt.id}`}onClick={this.handleClick}>X</button>

          <Link to={`/art/${singleArt.id}/edit`} activeClassName="active" id="editLink">Edit</Link>
          </ div>
          : <div />
        }
        <br />
        <h1>{singleArt.title}</h1>
        <div id="container-row">
          <div id="column">
            <img src = {singleArt.image} />
          </div>
          <div id="second-column">
            <p>{singleArt.description}</p>
            <p>Style: {singleArt.category}</p>
            <p>{singleArt.width}W x {singleArt.height}H</p>
            <p><strong>${singleArt.price}</strong></p>
            { singleArt.quantity === 0 ? <p>SOLD OUT</p> :
            <button type="submit" onClick={this.addtoCart}>Add to Cart</button> }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleArt: state.art.singleArt,
    user: state.user.singleUser,
    order: state.order.singleOrder
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: {
    loadSingleArt: function(id) {
        dispatch(fetchSingleArt(id))
    },
    removeSpecificArt: function(art) {
      dispatch(removeArt(art))
    },
    createOrder: function(product, orderInfo, user, page) {
      dispatch(postOrder(product, orderInfo, user, page));
    },
    editOrder: function(status, id, page, orderInfo, productIds ) {
      dispatch(putOrder(status, id, page, orderInfo, productIds))
    }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleArt))

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
    localStorage.setItem('product', JSON.stringify(this.props.singleArt))
    if(this.props.user.id) {
      let orders = this.props.user.orders;
      let productId = this.props.singleArt.id;
      let userId =this.props.user.id
      if(!orders.length) {
        console.log("GETTING HERE")
        this.props.actions.createOrder({productId, userId}, 'cart')
      } else {
        let created = orders.filter(order => order.status === 'created');
        //we need to pass in the new product and update its association
        this.props.actions.editOrder('created', created.id)
      }
    }
  }

  render() {
    console.log("USER IN SINGLE ART", this.props.user)
    const singleArt = this.props.singleArt
    const user = this.props.user
    return (
      <div>
        {
          user.UserType === 'admin' ?
          <div>
          <button
            type="button"
            id={`${singleArt.id}`}
            onClick={this.handleClick}
            >
          X
        </button>
        <Link to={`/art/${singleArt.id}/edit`} activeClassName="active" id="editLink">
            Edit
          </Link>
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
    user: state.user.singleUser
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
    createOrder: function(order, page) {
      dispatch(postOrder(order, page));
    },
    editOrder: function(status, id) {
      dispatch(putOrder(status, id))
    }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleArt))

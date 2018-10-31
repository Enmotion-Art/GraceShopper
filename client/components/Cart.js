import React, { Component } from 'react'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchSingleArt, removeArt } from '../store/art'
import Axios from 'axios';


class Cart extends Component {

async handleCheckout(event) {
    event.preventDefault();
    await Axios.post('/api/orders')
    }

  render() {
    const cart = JSON.parse(localStorage.getItem('product'))
    // const user = this.props.user

    return (
      <div>
        <br />
        <h1>{cart.title}</h1>
        <div id="container-row">
          <div id="column">
            <img src = {cart.image} />
          </div>
          <div id="second-column">
            <p>{cart.description}</p>
            <p>Style: {cart.category}</p>
            <p>{cart.width}W x {cart.height}H</p>
            <p><strong>${cart.price}</strong></p>
            { cart.quantity === 0 ? <p>Nothing in your cart!</p> :
            <button type="submit" onClick={this.handleCheckout}>Checkout</button> }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
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
    }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
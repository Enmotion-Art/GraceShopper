import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { fetchAllOrders } from '../store/order'


class AllOrders extends Component {

  componentDidMount() {
    this.props.loadInitialOrders()
  }

  render() {
    const orders = this.props.allOrders
      return (
        <div>
          {
            orders.map(order =>
            <div key={order.id}>
            <NavLink to={`/orders/${order.id}`}> {order.id} </NavLink>
            <div>ALSO RENDER DETAILS OF ORDER HERE</div>
            </div>
              )
          }
        </div>
      )
  }
}

const mapStateToProps = state => {
  return {
    allOrders: state.art.allOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitialOrders: function() {
      dispatch(fetchAllOrders())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)

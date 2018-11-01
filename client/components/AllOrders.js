import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { fetchAllOrders } from '../store/order'


class AllOrders extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedOrders: null, //inital null value to account for when an order doesn't match any category. Has to do with if/else stmt in the render. Subject to change.
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialOrders()
  }

    orderFilter (status) {
    const allOrders = this.props.allOrders

    if (status === 'created') return allOrders.filter(order => order.status === 'created')
    if (status === 'processing') return allOrders.filter(order => order.status === 'processing')
    if (status === 'shipped') return allOrders.filter(order => order.status === 'shipped')
    if (status === 'cancelled') return allOrders.filter(order => order.status === 'cancelled')
  }

  handleSelect(event) {
    const status = event.target.value
    this.setState({
        [event.target.name]: this.orderFilter(status)
       });
   }

  render() {
    const orders = this.props.allOrders
    const selectedOrders = this.state.selectedOrders

      return (
        <div>

          <div>
            <label>Filter by Status</label>
            <select name='selectedOrders' onChange={this.handleSelect}>
                <option></option>
                <option value='created'>Created</option>
                <option value='processing'  >Processing</option>
                <option value='shipped'  >Shipped</option>
                <option value='cancelled'  > Cancelled</option>
            </select>
        </div>

          {
            selectedOrders ?

            selectedOrders.map(order =>
             <div key ={order.id}>
              <NavLink to={`/order/${order.id}`}> {order.id} </NavLink>
              <div>ALSO RENDER DETAILS OF ORDER HERE</div>
             </div>
             )

            :
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
    user: state.user.singleUser
    allOrders: state.order.allOrders
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

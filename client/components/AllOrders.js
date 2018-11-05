import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'
import {fetchAllOrders, updateOrderStatus} from '../store/order'

class AllOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOrders: null, //inital null value to account for when an order doesn't match any category. Has to do with if/else stmt in the render. Subject to change.
      updatedOrderStatus: ''
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleStatus = this.handleStatus.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount() {
    this.props.actions.loadInitialOrders()
  }

  orderFilter(status) {
    const allOrders = this.props.allOrders

    if (status === 'created')
      return allOrders.filter(order => order.status === 'created')
    if (status === 'processing')
      return allOrders.filter(order => order.status === 'processing')
    if (status === 'shipped')
      return allOrders.filter(order => order.status === 'shipped')
    if (status === 'cancelled')
      return allOrders.filter(order => order.status === 'cancelled')
  }

  handleSelect(event) {
    const status = event.target.value
    this.setState({
      [event.target.name]: this.orderFilter(status)
    })
  }

  handleStatus(event) {
    const updatedStatus = event.target.value
    // console.log('event', event.target.value)
    this.setState({
      [event.target.name]: updatedStatus
    })
    console.log('state', this.state)
  }

  handleUpdate(event) {
    // console.log('event.target.id', event.target.id)
    const orderId = event.target.id
    const updatedStatus = this.state.updatedOrderStatus
    this.props.actions.changeOrderStatus({status: updatedStatus}, orderId)
    console.log('updatedStatus', updatedStatus)
  }

  render() {
    const orders = this.props.allOrders
    console.log(orders)
    const selectedOrders = this.state.selectedOrders

    return (
      <div className="grid">
        <div className="grid-child">
          <label>Filter by Status</label>
          <select name="selectedOrders" onChange={this.handleSelect}>
            <option />
            <option value="created">Created</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled"> Cancelled</option>
          </select>
        </div>
        <table class="blueTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Subtotal</th>
              <th>Street Num</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Products (ID)</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrders
              ? selectedOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.firstName}</td>
                    <td>{order.lastName}</td>
                    <td>{order.email}</td>
                    <td>{order.status}
                    <select name="updatedOrderStatus" onChange={this.handleStatus}>
                        <option />
                        <option value="created">Created</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="cancelled"> Cancelled</option>
                      </select>
                      <button type="button" id={`${order.id}`} onClick={this.handleUpdate}> Update </button>
                    </td>
                    <td>{order.subtotal}</td>
                    <td>{order.streetNum}</td>
                    <td>{order.street}</td>
                    <td>{order.city}</td>
                    <td>{order.state}</td>
                    <td>{order.zip}</td>
                    <td>{order.arts ?
                      order.arts.map(art=>
                         <button><NavLink to={`/art/${art.id}`}>{art.id}</NavLink></button>
                         )
                      : <div></div>
                    }</td>
                    <td>{order.createdAt}</td>
                    <td>{order.updatedAt}</td>
                    <td>{order.userId}</td>
                  </tr>
                ))
              : orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.firstName}</td>
                    <td>{order.lastName}</td>
                    <td>{order.email}</td>
                    <td>{order.status}
                      <select name="updatedOrderStatus" onChange={this.handleStatus}>
                        <option />
                        <option value="created">Created</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="cancelled"> Cancelled</option>
                      </select>
                      <button type="button" id={`${order.id}`} onClick={this.handleUpdate}> Update </button>
                    </td>
                    <td>{order.subtotal}</td>
                    <td>{order.streetNum}</td>
                    <td>{order.street}</td>
                    <td>{order.city}</td>
                    <td>{order.state}</td>
                    <td>{order.zip}</td>
                    <td>{order.arts ?
                      order.arts.map(art=>
                        <button><NavLink to={`/art/${art.id}`}>{art.id}</NavLink></button>
                        )
                      : <div></div>
                    }</td>
                    <td>{order.createdAt}</td>
                    <td>{order.updatedAt}</td>
                    <td>{order.userId}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.singleUser,
    allOrders: state.order.allOrders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadInitialOrders: function() {
        dispatch(fetchAllOrders())
    },
    changeOrderStatus: function(order, orderId) {
      dispatch(updateOrderStatus(order, orderId))
    }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)

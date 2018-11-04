import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'
import {fetchAllOrders} from '../store/order'

class AllOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOrders: null //inital null value to account for when an order doesn't match any category. Has to do with if/else stmt in the render. Subject to change.
    }
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialOrders()
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

  render() {
    const orders = this.props.allOrders
    const selectedOrders = this.state.selectedOrders
    console.log(selectedOrders);

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
              <th>Order ID</th>
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
              <th>Products</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>User ID</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrders
              ? selectedOrders.map(order => (
                  <tr key={order.id}>
                    <td as={NavLink} to={`/order/${order.id}`}>{order.id}</td>
                    <td>{order.firstName}</td>
                    <td>{order.lastName}</td>
                    <td>{order.email}</td>
                    <td>{order.status}
                    <select name="updatingStatus">
                        <option />
                        <option value="created">Created</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="cancelled"> Cancelled</option>
                      </select>
                      <button type="button" id={`${order.id}`} onClick={this.handleStatus}> Update </button>
                    </td>
                    <td>{order.subtotal}</td>
                    <td>{order.streetNum}</td>
                    <td>{order.street}</td>
                    <td>{order.city}</td>
                    <td>{order.state}</td>
                    <td>{order.zip}</td>
                    <td>Products Placeholder</td>
                    <td>{order.createdAt}</td>
                    <td>{order.updatedAt}</td>
                    <td>{order.userId}</td>
                  </tr>
                ))
              : orders.map(order => (
                  <tr key={order.id}>
                    <td as={NavLink} to={`/order/${order.id}`}>{order.id}</td>
                    <td>{order.firstName}</td>
                    <td>{order.lastName}</td>
                    <td>{order.email}</td>
                    <td>{order.status}
                      <select name="updatingStatus">
                        <option />
                        <option value="created">Created</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="cancelled"> Cancelled</option>
                      </select>
                      <button type="button" id={`${order.id}`} onClick={this.handleStatus}> Update </button>
                    </td>
                    <td>{order.subtotal}</td>
                    <td>{order.streetNum}</td>
                    <td>{order.street}</td>
                    <td>{order.city}</td>
                    <td>{order.state}</td>
                    <td>{order.zip}</td>
                    <td>Products Placeholder</td>
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
    loadInitialOrders: function() {
      dispatch(fetchAllOrders())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)

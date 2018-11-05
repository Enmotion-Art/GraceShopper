import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import OrderDetails from './OrderDetails'
import { runInThisContext } from 'vm';



class UserOrders extends Component {
  constructor() {
    super()
    this.state = {
      showOrderDetails: false, //used to show order details after user clicks on 'view order details'
      orderClicked: null
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(orderId) {
    this.setState({
      showOrderDetails: !this.showOrderDetails,
      orderClicked: orderId
    });
  }

  render() {
    const orders = this.props.user.orders
    console.log("USER ORDERS", orders)

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Order#</th>
              <th>Status</th>
              <th>Total</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map(order =>
                order.status === 'processing' || order.status === 'shipped' ?
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.status}</td>
                    <td>${order.subtotal}</td>
                    <td><button type="button" onClick={() => this.handleClick(order.id)}>View Order Details</button> </td>
                  </tr>

                  : null
              )
            }
          </tbody>
        </table>

        <div>
          {
            this.state.showOrderDetails ?
              <OrderDetails orderNumber={this.state.orderClicked} order={orders.filter(order => order.id === this.state.orderClicked)} />
              : null
          }
        </div>

      </div>


    )
  }
}

export default UserOrders

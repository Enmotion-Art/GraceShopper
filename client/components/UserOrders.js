import React from 'react'
import { NavLink } from 'react-router-dom'


const UserOrders = (props) => {
  const orders = props.user.orders

  console.log("USER ORDERS", orders)

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order#</th>
            <th>Status</th>
            <th>Total</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map(order =>
              order.status === 'processing' || order.status === 'shipped' ?
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.status}</td>
                  <td>{order.subtotal}</td>
                  {
                    order.status === 'shipped' ?
                      <td><NavLink to={'/art/1/review'} > Leave Review</NavLink> </td> //Open to update once detail order page is ready
                      :
                      null
                  }
                </tr>

                : null
            )
          }
        </tbody>
      </table>
    </div>


  )
}

export default UserOrders

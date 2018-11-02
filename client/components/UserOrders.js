import React from 'react'


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

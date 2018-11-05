import React from 'react'
import { NavLink } from 'react-router-dom'


const OrderDetails = (props) => {
  const order = props.order[0]
  const products = props.order[0].arts
  console.log('PRODUCTS in ORDER DETAILS', props)

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product =>
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                {
                  order.status === 'shipped' ?
                    < td > <NavLink to={`/art/${product.id}/review`}>Leave Review</NavLink></td>
                    : null
                }

              </tr>
            )
          }
        </tbody>
      </table>
    </div>


  )
}

export default OrderDetails
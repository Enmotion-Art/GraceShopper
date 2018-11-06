import React from 'react'
import { NavLink } from 'react-router-dom'


const OrderDetails = (props) => {
  const order = props.order[0]
  const products = props.order[0].arts
  // console.log('PRODUCTS in ORDER DETAILS', props)

  return (

    <div>
      <h3 className='order-details'>Your Order Details:</h3>
      <table className='blueTable'>
        <thead>
          <tr className='yellow'>
            <th>Product Id</th>
            <th>Name</th>
            <th>Price</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product =>
              <tr className='black' key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                {
                  order.status === 'shipped' ?
                    <button><NavLink to={`/art/${product.id}/review`} style={{color:"black"}}>Leave Review</NavLink> </button>
                    : 'N/A'
                }
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>


  )
}

export default OrderDetails

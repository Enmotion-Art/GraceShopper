import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


const Reviews = (props) => {
  const reviews = this.props.reviews
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


const mapStateToProps = state => {
  return {
    user: state.user.singleUser,
    reviews: state.review.allReviews
  }
}


export default withRouter(connect(mapStateToProps)(Reviews))





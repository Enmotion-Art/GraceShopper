import React from 'react'
import { connect } from 'react-redux'

const Confirmation = (props) => {
  return (
      <div>
        <div>Thank you for your order! Your order number is <strong>#{props.order.id}</strong>.</div>
        <div>You'll receive a confirmation email shortly.</div>
      </div>
  )
}

const mapStateToProps = state => ({
  order: state.order.singleOrder
})

export default connect(mapStateToProps)(Confirmation)


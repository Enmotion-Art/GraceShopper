import React from 'react'
import { connect } from 'react-redux'

const Confirmation = (props) => {
  return (
    <div>Thank you for your order! You'll receive a confirmation email shortly.</div>
  )
}

const mapStateToProps = state => ({
  order: state.order.singleOrder
})

export default connect(mapStateToProps)(Confirmation)


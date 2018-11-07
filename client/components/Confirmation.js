import React from 'react'
import { connect } from 'react-redux'

const Confirmation = (props) => {
  return (
    <div>
    <div>
      <p />
    </div>
      <p />
      <p />
      <div className="main-container">Thank you for your order! You'll receive a confirmation email shortly.</div>
    </div>
  )
}

const mapStateToProps = state => ({
  order: state.order.singleOrder
})

export default connect(mapStateToProps)(Confirmation)


import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AdminPage from './AdminPage'
import StandardPage from './StandardPage'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {firstName} = props
  const {type} = props
  return (
    <div className='grid'>
      <h3>Welcome, {firstName}!</h3>
      {
        type === 'admin' ? <AdminPage /> : <StandardPage />
      }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    firstName: state.user.singleUser.firstName,
    email: state.user.singleUser.email,
    type: state.user.singleUser.UserType,
    order: state.order.singleOrder
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
}

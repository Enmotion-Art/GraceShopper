import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AdminPage from './AdminPage'
import StandardPage from './StandardPage'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props
  const {type} = props
  console.log('is user home rendering')
  console.log('props.type', type)
  return (
    <div>
      <h3>Welcome, {email}</h3>
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
    email: state.user.singleUser.email,
    type: state.user.singleUser.UserType
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}

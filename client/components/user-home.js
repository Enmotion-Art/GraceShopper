import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import AdminPage from './AdminPage'
import StandardPage from './StandardPage'
import { me } from '../store/user'

/**
 * COMPONENT
 */
class UserHome extends React.Component {

  componentDidMount() {
    this.props.getMeAgain()
  }

  render() {
    const {firstName} = this.props
    const {type} = this.props
    return (
      <div className='grid'>
        <h3>Welcome, {firstName}!</h3>
        {
          type === 'admin' ? <AdminPage /> : <StandardPage />
        }
      </div>
    )
  }
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

const mapDispatch = dispatch => ({
  getMeAgain: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string,
}

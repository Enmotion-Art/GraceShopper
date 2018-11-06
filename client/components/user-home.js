import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AdminPage from './AdminPage'
import StandardPage from './StandardPage'
import { me } from '../store/user'

/**
 * COMPONENT
 */
class UserHome extends React.Component {

  //Refetching the user keeps the SingleArt from logging the user out (temporarily) on refresh but it messes up how the cart persists from an un-auth session to a logged in session. Commenting it out for now

  // componentDidMount() {
  //   this.props.getMeAgain()
  // }

  render() {
    const { firstName } = this.props
    const { type } = this.props
    return (
      <div className='main-container'>
        <h1 className='yellow'>Welcome, {firstName}!</h1>
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

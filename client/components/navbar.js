import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const nameStandard = 'Orders'
const nameAdmin = 'Home'

const Navbar = ({ handleClick, isLoggedIn, user }) => (
  <div className='navgrid' id='navContainer' >
    <nav className='nav-child'>
      {isLoggedIn ? (
        <div className='links'>
          {/* The navbar will show these links after you log in */}
          <Link to="/art"> Shop</Link>
          <Link to="/home">{user.UserType === 'standard' ? nameStandard : nameAdmin}</Link>
          <Link to="/cart">Cart</Link>
          <a href="#" onClick={handleClick}>
            Logout
              </a>
            </div>
      ) : (
          <div className='links'>
            {/* The navbar will show these links before you log in */}
            <Link to="/art">Shop</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}

    </nav>
    <div className='grid-child' id='navTitle'></div>
    <div className='grid-child' id='navTitle'>EnMotion Art</div>

  </div >
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.singleUser.id,
    user: state.user.singleUser
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

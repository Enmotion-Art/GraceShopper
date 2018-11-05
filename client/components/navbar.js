import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'



const Navbar = ({handleClick, isLoggedIn}) => (
  <div className='navgrid' id='navContainer'>
    <nav className='nav-child'>
        {/* <Link to="/art">Art Shop</Link> */}
          {isLoggedIn ? (
            <div classname='links'>
              {/* The navbar will show these links after you log in */}
              <Link to="/art">Shop</Link>
              <Link to="/home">Home</Link>
              <Link to="/cart">Cart</Link>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </div>
          ) : (
            <div classname='links'>
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

  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.singleUser.id,
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

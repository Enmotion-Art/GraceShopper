import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Navbar } from './components'
import { Login, Signup, UserHome } from './components'
import AllArt from './components/AllArt'
import SingleArt from './components/SingleArt'
import EditArt from './components/EditArt'
import Cart from './components/Cart'
import AllOrders from './components/AllOrders'
import SingleOrder from './components/SingleOrder'
import CheckoutForm from './components/CheckoutForm'
import Confirmation from './components/Confirmation'
import ReviewForm from './components/ReviewForm'


import { me } from './store'
import { fetchUserOrder } from './store/order'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (

      <div>
        <Navbar />

        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/confirmation" component={Confirmation} />

        <Route exact path="/art" component={AllArt} />
        <Route exact path="/art/:artId" component={SingleArt} />
        <Route path="/art/:artId/edit" component={EditArt} />
        <Route exact path="/art/:artId/review" component={ReviewForm} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/checkout" component={CheckoutForm} />


        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            {/* <Route path="/home" component={AdminPage} /> */}
            {/* <Route exact path="/art" component={AllArt} /> */}
            <Route exact path="/home" component={UserHome} />
            {/* BELOW NEED TO BE AVAIL ADMIN ONLY... */}
            <Route exact path="/order" component={AllOrders} />
            <Route exact path="/order/:orderId" component={SingleOrder} />
          </Switch>
        )}

      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.singleUser.id,
    type: state.user.singleUser.UserType,
    user: state.user.singleUser
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

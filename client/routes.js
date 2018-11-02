import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Login, Signup, UserHome} from './components'
import AllArt from './components/AllArt'
import SingleArt from './components/SingleArt'
import EditArt from './components/EditArt'
import Cart from './components/Cart'
import AllOrders from './components/AllOrders'
import SingleOrder from './components/SingleOrder'
import CheckoutForm from './components/CheckoutForm'
import LandingPage from './components/LandingPage'
import Confirmation from './components/Confirmation'

import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
        <Switch>

          {/* Routes placed here are available to all visitors */}

          <Route exact path ="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/confirmation" component={Confirmation} />

          <Route exact path ="/art" component={AllArt} />
          <Route exact path ="/art/:artId" component={SingleArt} />
          <Route path= "/art/:artId/edit" component={EditArt} />
          <Route path="/cart" component={Cart} />
          <Route exact path="/checkout" component={CheckoutForm} />


          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              {/* <Route path="/home" component={AdminPage} /> */}
              <Route path="/home" component={UserHome} />
              {/* BELOW NEED TO BE AVAIL ADMIN ONLY... */}
              <Route exact path ="/order" component={AllOrders} />
              <Route exact path ="/order/:orderId" component={SingleOrder} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={LandingPage} />
        </Switch>

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
    type: state.user.singleUser.UserType
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

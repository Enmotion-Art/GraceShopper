import React, { Component } from 'react'
import UserOrders from './UserOrders'
import { me } from '../store/user'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store';


class StandardPage extends Component {
    componentDidMount() {
        //To trigger a refresh so that new orders places will show in the standard page
        store.dispatch(me())
    }

    render() {
        const { user } = this.props
        console.log('USER ON STANDARDPAGE', user)
        console.log()
        return (

            <div>
                <div className='grid-child'>hello!!</div>
                <div>
                    <h2>Your Orders:</h2>
                    <UserOrders user={user} />
                </div>
            </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.user.singleUser
    }
}


export default withRouter(connect(mapStateToProps)(StandardPage))






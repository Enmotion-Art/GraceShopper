import React, { Component } from 'react'
import UserOrders from './UserOrders'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


class StandardPage extends Component {
    render() {

        const { user } = this.props
        console.log('USER on StandardPage', user)
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






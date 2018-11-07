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
        return (

            <div>
                <div className='grid-child'>
                    <div className='user-orders'>
                        <div><h2 className='order-details' id='left-float'>Your Orders:</h2></div>
                        <h3 className='yellow'>We'd love to hear your thoughts on any artwork that was shipped to you!</h3>
                        <UserOrders user={user} />
                    </div>
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






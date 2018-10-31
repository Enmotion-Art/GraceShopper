import React, { Component } from 'react'
import AddArt from './AddArt'
import AllOrders from './AllOrders'

class AdminPage extends Component {
    render() {
        return (
            <AddArt title='Add A New Piece Of Art'/>
            <h2>Orders:</h2>
            <AllOrders />
        )
    }
}

export default AdminPage


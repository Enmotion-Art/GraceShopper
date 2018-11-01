import React, { Component } from 'react'
import AddArt from './AddArt'
import AllOrders from './AllOrders'
import AllUsers from './AllUsers'

class AdminPage extends Component {
    render() {
        return (
          <div>
            <AddArt title='Add A New Piece Of Art'/>
            <p></p>
            <h2>Orders:</h2>
            <AllOrders />
            <p></p>
            <h2>Users:</h2>
            <AllUsers />
          </div>
        )
    }
}

export default AdminPage


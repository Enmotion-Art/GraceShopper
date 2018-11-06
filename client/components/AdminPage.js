import React, { Component } from 'react'
import AddArt from './AddArt'
import AllOrders from './AllOrders'
import AllUsers from './AllUsers'

class AdminPage extends Component {
    render() {
        return (
          <div className='admin-grid'>
            <AddArt title='Add A New Piece Of Art'/>

            <div className='admin-grid-child'>
              <div>
                <h2 className='yellow'>Orders:</h2>
                <AllOrders />
              </div>
              <div>
                <h2 className='yellow'>Users:</h2>
                <AllUsers />
              </div>
            </div>
          </div>
        )
    }
}

export default AdminPage


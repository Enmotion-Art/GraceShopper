import React, { Component } from 'react'
import AddArt from './AddArt'
import AllOrders from './AllOrders'
import AllUsers from './AllUsers'

class AdminPage extends Component {
  constructor() {
    super()
    this.state = {
      showAddArtForm: false
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({
      showAddArtForm: !this.state.showAddArtForm
    });
  }

  render() {
    return (
      <div className='admin-grid'>
        <div className='admin-grid-child'>
          <div><button type='button' onClick={this.handleClick}>Add Art</button></div>
          {
            this.state.showAddArtForm ?
              <AddArt title='Add A New Piece Of Art' />
              :
              null
          }

        </div>
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


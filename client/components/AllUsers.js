import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'
import {fetchAllUsers, deleteThisUser} from '../store/user'

class AllUsers extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.actions.loadInitialUsers()
  }
  handleClick(event) {
    event.preventDefault()
    const UserId = event.target.id
    this.props.actions.removeSpecificUser({id: UserId})
  }

  render() {
    const users = this.props.allUsers

    return (
      <div className="grid">
        <table class="blueTable">
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Street Num</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Remove User</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              // <div className='grid-child' key={user.id}>
              // <NavLink to={`/user/${user.id}`}> {user.id} </NavLink>
              // <button type="button" id={`${user.id}`} onClick={this.handleClick}>
              // X
              // </button>
              // <div>ALSO RENDER DETAILS OF USER HERE (INCLUDING THAT USERS ORDERS?)</div>
              // </div>
              <tr key={user.id}>
                <td as={NavLink} to={`/user/${user.id}`}>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.userType}</td>
                <td>{user.streetNum}</td>
                <td>{user.street}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.zip}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
                <td><button type="button" id={`${user.id}`} onClick={this.handleClick}> X </button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allUsers: state.user.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadInitialUsers: function() {
        dispatch(fetchAllUsers())
      },
      removeSpecificUser: function(user) {
        dispatch(deleteThisUser(user))
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)

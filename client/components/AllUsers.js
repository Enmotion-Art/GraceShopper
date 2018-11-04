import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink, withRouter} from 'react-router-dom'
import {fetchAllUsers, deleteThisUser, updateUserStatus} from '../store/user'
import history from '../history'

class AllUsers extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleStatus = this.handleStatus.bind(this)
    this.handleReset = this.handleStatus.bind(this)
  }

  componentDidMount() {
    this.props.actions.loadInitialUsers()
  }
  handleClick(event) {
    event.preventDefault()
    const UserId = event.target.id
    this.props.actions.removeSpecificUser({id: UserId})
  }

  handleStatus(event) {
    event.preventDefault()
    const UserId = event.target.id
    this.props.actions.changeUserStatus({id: UserId})
    history.push('/home')
  }

  handleReset(event) {
    event.preventDefault()
    //Trigger Reset code here
    //hmmm how do we want to go about this?
  }

  render() {
    const users = this.props.allUsers

    return (
      <div className="grid">
        <table class="blueTable">
          <thead>
            <tr>
              <th>ID</th>
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
              <th>Password</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (

              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.UserType}   {
                  user.UserType === 'standard' ?
                  <button type="button" id={`${user.id}`} onClick={this.handleStatus}> Make admin </button>
                  : <div/>
                  }</td>
                <td>{user.streetNum}</td>
                <td>{user.street}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.zip}</td>
                <td>{user.createdAt}</td>
                <td>{user.updatedAt}</td>
                <td><button type="button" id={`${user.id}`} onClick={this.handleReset}> Reset </button></td>
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
        dispatch(deleteThisUser(user));
      },
      changeUserStatus: function(user) {
        dispatch(updateUserStatus(user))
      }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllUsers))

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { fetchAllUsers } from '../store/user'


class AllUsers extends Component {

  componentDidMount() {
    this.props.loadInitialUsers()
  }

  render() {
    const users = this.props.allUsers

      return (
        <div>
          {
            users.map(user =>
            <div key={user.id}>
            <NavLink to={`/user/${user.id}`}> {user.id} </NavLink>
            <div>ALSO RENDER DETAILS OF USER HERE (INCLUDING THAT USERS ORDERS?)</div>
            </div>
              )
          }
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
    loadInitialUsers: function() {
      dispatch(fetchAllUsers())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)

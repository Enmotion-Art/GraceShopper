import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { fetchAllUsers, deleteThisUser } from '../store/user'


class AllUsers extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.actions.loadInitialUsers()
  }
handleClick(event) {
  event.preventDefault();
  const UserId = event.target.id;
  this.props.actions.removeSpecificUser({ id: UserId });
  }

  render() {
    const users = this.props.allUsers

      return (
        <div className='grid'>
          {
            users.map(user =>
            <div className='grid-child' key={user.id}>
            <NavLink to={`/user/${user.id}`}> {user.id} </NavLink>
            <button type="button" id={`${user.id}`} onClick={this.handleClick}> 
            X 
            </button>
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

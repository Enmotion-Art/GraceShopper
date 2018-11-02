import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_USERS = 'GOT_ALL_USERS'
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER' //logging out user
const DELETE_USER = 'DELETE_USER' //deleting from database

/**
 * INITIAL STATE
 */
const initialState = {
  allUsers: [],
  singleUser: {}
}


/**
 * ACTION CREATORS
 */
const gotAllUsers = users => ({type: GOT_ALL_USERS, users})
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER}) //logging out a user
const deleteUser = (user) => ({type: DELETE_USER}) //deleting from database

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    let user
    if (res.data.id) {
      const response = await axios.get(`api/users/${res.data.id}`)
      user = response.data
    } else {
      user = initialState.singleUser
    }
    dispatch(getUser(user || initialState.singleUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    const { data } = await axios.get(`api/users/${res.data.id}`)
    dispatch(getUser(data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const fetchAllUsers = () => async dispatch => {
  try {
    const response = await axios.get('/api/users')
    const allUsers = response.data
    const action = gotAllUsers(allUsers)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

export const deleteThisUser = (user) => {
  return async (dispatch) => {
    const removedUser = await axios.delete('/api/users', { data: user})
    const action = removeUser(removedUser);
    dispatch(action)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_USERS:
      return { ...state, allUsers: action.users }
    case GET_USER:
      return { ...state, singleUser: action.user }
    case REMOVE_USER:
      return { ...state, singleUser: {} }
    default:
      return state
  }
}

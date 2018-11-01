import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ALL_USERS = 'GOT_ALL_USERS'
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

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
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    console.log('res.data', res.data)
    let user
    if (res.data.id) {
      const response = await axios.get(`api/users/${res.data.id}`)
      console.log('response', response)
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
    dispatch(getUser(res.data))
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
    const response = await axios.get('/api/user')
    const allUsers = response.data
    const action = gotAllUsers(allUsers)
    dispatch(action)
  } catch (err) {
    console.error(err)
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

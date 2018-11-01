import axios from 'axios'
import history from '../history'

const initialState = ({
  allOrders: [],
  singleOrder: {}
})
//ACTION TYPES
export const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'
export const GOT_SINGLE_ORDER = 'GOT_SINGLE_ORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const DELETE_ORDER = 'DELETE_ORDER'

//ACTION CREATORS
export const gotAllOrders = (allOrders) => ({
  type: GOT_ALL_ORDERS,
  allOrders
})
export const gotSingleOrder = (order) => ({
  type: GOT_SINGLE_ORDER,
  order
})

export const addOrder = (order) => ({
  type: ADD_ORDER,
  order
})

export const updateOrder = (order) => ({
  type: UPDATE_ORDER,
  order
})

export const deleteOrder = (order) => ({
  type: DELETE_ORDER,
  order
})

//THUNK CREATORS
export const fetchAllOrders = () =>  {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/orders')
      const allOrders = response.data
      const action = gotAllOrders(allOrders)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
 }

 export const fetchSingleOrder = (id) =>  {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/order/${id}`)
      const singleOrder = response.data
      const action = gotSingleOrder(singleOrder)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
 }

 export const postOrder = (order) => {
   return async (dispatch) => {
     try {
       const response = await axios.post('/api/orders', order)
       const newOrder = response.data
       const action = addOrder(newOrder)
       dispatch(action)
       localStorage.setItem('order', JSON.stringify(newOrder))
       history.push('/checkout')
     } catch (err) {
       console.log(err)
     }
   }
 }

 export const putOrder = (status, id) => {
   return async (dispatch) => {
     try {
       const response = await axios.put(`/api/orders/${id}`, { status: status})
       const updatedOrder = response.data
       const action = updateOrder(updatedOrder)
       dispatch(action)
       localStorage.removeItem('order')
       localStorage.removeItem('product')
       history.push('/')
     } catch (err) {
       console.log(err)
     }
   }
 }

 export const removeOrder = (order) => {
   return async (dispatch) => {
     const removedOrder = await axios.delete('/api/order', { data: order })
     const action = deleteOrder(removedOrder);
     dispatch(action)
     history.push(`/order`)
   }
 }

//ORDER REDUCER

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_ORDERS:
      return { ...state, allOrders: action.allOrders }
    case GOT_SINGLE_ORDER:
      return { ...state, singleOrder: action.order }
    case ADD_ORDER:
      return {...state, allOrders: [...state.allOrders, action.order], singleOrder: action.order }
    case UPDATE_ORDER:
      return {...state, singleOrder: action.order}
    default:
      return state
  }
}

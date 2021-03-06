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
const CHANGED_ORDER_PRODUCT = 'CHANGED_ORDER_PRODUCT'

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

export const changedOrderProduct = (order) => ({
  type: CHANGED_ORDER_PRODUCT,
  order
})

//THUNK CREATORS
export const fetchAllOrders = () => {
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

export const fetchSingleOrder = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/orders/${id}`)
      const singleOrder = response.data
      const action = gotSingleOrder(singleOrder)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
}


 export const postOrder = (productIds, orderInfo, userId, page) => {
   return async (dispatch) => {
     try {
        const response = await axios.post('/api/orders', { productIds,  orderInfo, userId })
        let newOrder = response.data
        if(page === 'confirmation') {
          localStorage.removeItem('product');
          newOrder = {};
        }
        const action = addOrder(newOrder)
        dispatch(action)
        if(page) {
          history.push(`/${page}`)
        }
     } catch (err) {
       console.log(err)
     }
   }
 }


export const putOrder = (status, id, orderInfo, page, productIds, quant) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/orders/${id}`, { status: status, orderInfo: orderInfo, productIds: productIds, orderId: id })
      if(quant) {
        dispatch(changeOrderProduct(id, productIds[0], quant))
      }
      let updatedOrder = response.data
      if(page === 'confirmation') {
        localStorage.removeItem('product');
        updatedOrder = {};
        dispatch(updateOrder({}))
      } else {
        dispatch(updateOrder(updatedOrder))
      }
      if(page) {
        history.push(`/${page}`)
      }
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
    history.push('/order')
  }
}

export const changeOrderProduct = (orderId, productId, quantity) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/orders/${orderId}/${productId}`, { quantity: quantity })
    dispatch(changedOrderProduct(data));
  }
}

export const updateOrderStatus = (order, orderId) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/orders/${orderId}`, order)
    const updatedOrder = response.data
    const action = updateOrder(updatedOrder)
    dispatch(action)
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
      return { ...state, allOrders: [...state.allOrders, action.order], singleOrder: action.order }
    case UPDATE_ORDER: {
      const newOrderList = state.allOrders.slice().filter(order => order.id !== action.order.id) //This is used for update order! So the updated order immediately renders
      return {...state, allOrders: [...newOrderList, action.order], singleOrder: action.order }
    }
    case CHANGED_ORDER_PRODUCT:
      return {...state, singleOrder: action.order }
    default:
      return state
  }
}

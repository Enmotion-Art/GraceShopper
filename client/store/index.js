import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './user'
import { artReducer } from './art'
import { orderReducer } from './order'
import { reviewReducer } from './review'


const reducer = combineReducers({
  user: userReducer,
  art: artReducer,
  order: orderReducer,
  review: reviewReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

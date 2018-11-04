import axios from 'axios'
import history from '../history'

const initialState = {
  allReviews: [],
  singleReview: {}
}

//ACTION TYPES
export const ADD_REVIEW = 'ADD_REVIEW' //add review for single art
export const GOT_REVIEWS = 'GOT_REVIEWS' //got reviews for single art

//ACTION CREATORS
export const addReview = (review) => ({
  type: ADD_REVIEW,
  review
})

export const gotReviews = (reviews) => ({
  type: GOT_REVIEWS,
  reviews
})

//THUNK CREATORS
export const postReview = (artId, newReview) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/art/${artId}/reviews`, newReview)
      const review = response.data
      const action = addReview(review)
      dispatch(action)
    }
    catch (err) { console.log(err) }
  }
}

export const fetchReviews = (artId) => {
  return async (dispatch) => {
    try {
      console.log('HISTORY')

      const response = await axios.get(`/api/art/${artId}/reviews`)
      const reviews = response.data
      const action = gotReviews(reviews)
      console.log('HISTORY')
      dispatch(action)

    }
    catch (err) { console.log(err) }
  }
}



//REVIEW REDUCER
export const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEW:
      return { ...state, allReviews: [...state.allReviews, action.review], singleReview: action.review }
    case GOT_REVIEWS:
      return { ...state, allReviews: action.reviews }
    default:
      return state
  }
}

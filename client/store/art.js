import axios from 'axios'
import history from '../history'
import { me } from './user'

const initialState = ({
  allArt: [],
  singleArt: {}
})
//ACTION TYPES
export const GOT_ALL_ART = 'GOT_ALL_ART'
export const GOT_SINGLE_ART = 'GOT_SINGLE_ART'
export const ADD_ART = 'ADD_ART'
export const UPDATE_ART = 'UPDATE_ART'
export const DELETE_ART = 'DELETE_ART'

//ACTION CREATORS
export const gotAllArt = (allArt) => ({
  type: GOT_ALL_ART,
  allArt
})
export const gotSingleArt = (art) => ({
  type: GOT_SINGLE_ART,
  art
})

export const addArt = (art) => ({
  type: ADD_ART,
  art
})

export const updateArt = (art) => ({
  type: UPDATE_ART,
  art
})

export const deleteArt = (art) => ({
  type: DELETE_ART,
  art
})

//THUNK CREATORS
export const fetchAllArt = () =>  {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/art')
      const allArt = response.data
      const action = gotAllArt(allArt)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
 }
 export const fetchSingleArt = (id) =>  {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/art/${id}`)
      const singleArt = response.data
      const action = gotSingleArt(singleArt)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
 }
 export const postArt = (art) => {
   return async (dispatch) => {
     try {
       const response = await axios.post('/api/art', art)
       const newArt = response.data
       const action = addArt(newArt)
       dispatch(action)
       history.push(`/art/${newArt.id}`)
     } catch (err) {
       console.log(err)
     }
   }
 }
 export const putArt = (art, id) => {
   return async (dispatch) => {
     try {
       const response = await axios.put(`/api/art/${id}`, art)
       const updatedArt = response.data
       const action = updateArt(updatedArt)
       dispatch(action)
     } catch (err) {
       console.log(err)
     }
   }
 }
 export const removeArt = (art) => {
   return async (dispatch) => {
     const removedArt = await axios.delete('/api/art', { data: art })
     const action = deleteArt(removedArt);
     dispatch(action)
     history.push(`/art`)
   }
 }

//ART REDUCER

export const artReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_ART:
      return { ...state, allArt: action.allArt }
    case GOT_SINGLE_ART:
      return { ...state, singleArt: action.art }
    case ADD_ART:
      return {...state, allArt: [...state.allArt, action.art]}
    case UPDATE_ART:
      return {...state, singleArt: action.art}
    default:
      return state
  }
}

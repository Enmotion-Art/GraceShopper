import axios from 'axios'
import history from '../history'

const initialState = ({
  allArt: [],
  singleArt: {}
})
//ACTION TYPES
export const GOT_ALL_ART = 'GOT_ALL_ART'
export const GOT_SINGLE_ART = 'GOT_SINGLE_ART'

//ACTION CREATORS
export const gotAllArt = (allArt) => ({
  type: GOT_ALL_ART,
  allArt
})
export const gotSingleArt = (art) => ({
  type: GOT_SINGLE_ART,
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
      console.log('before axios inside thunk')
      const response = await axios.get(`/api/art/${id}`)
      console.log('after axios inside thunk')

      const singleArt = response.data
      const action = gotSingleArt(singleArt)
      dispatch(action)
    } catch (err) {
      console.log(err)
    }
  }
 }

//ART REDUCER

export const artReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_ART:
      return { ...state, allArt: action.allArt }
    case GOT_SINGLE_ART:
      return { ...state, singleArt: action.art }

    default:
      return state
  }
}

import React from 'react'
import { NavLink } from 'react-router-dom'

const LandingPage = () => (

    <div id='landingPage' className='grid'>

      <NavLink className='grid-child' to='/art' >
      <button>Welcome to EnMotion Art!</button></NavLink>


      <form action='/api/art' method='GET' className='grid-child'>
        <div className='form-group'>
          <input type='text' name='search' placeholder='Art search...' className='form-control'></input>
          <input type='submit' value='Search' className='btn btn-default'></input>
        </div>
      </form>
      </div>
)

export default LandingPage

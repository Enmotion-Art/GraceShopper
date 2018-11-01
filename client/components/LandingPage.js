import React from 'react'
import { NavLink } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div>
      <body id="landingPage">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <NavLink to='/art' >Welcome to EnMotion Art!</NavLink>
      <p></p>
      <p></p>
      <p></p>
      <p></p>

      <form action='/api/art' method='GET' className='form-inline'>
        <div className='form-group'>
          <input type='text' name='search' placeholder='Art search...' className='form-control'></input>
          <input type='submit' value='Search' className='btn btn-default'></input>
        </div>
      </form>
      </body>
    </div>
  )
}

export default LandingPage

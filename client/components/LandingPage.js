import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div id='landingPage' >
      <div id='landingLink'>
      <button align='center' id='landingLink'><NavLink id='landingLink' to='/art' >Welcome to EnMotion Art!</NavLink></button>


      {/* <form action='/api/art' method='GET' className='grid-child'>
        <div className='form-group'>
          <input type='text' name='search' placeholder='Art search...' className='form-control'></input>
          <input type='submit' value='Search' className='btn btn-default'></input>
        </div>
      </form> */}

      </div>
      </div>
  )
}

export default LandingPage

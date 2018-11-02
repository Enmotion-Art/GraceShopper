import React from 'react'
import Routes from './routes'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import LandingPage from './components/LandingPage'


const App = () => {
  return (
      <Switch>
          <Redirect exact path='/' to='/landingPage' />
          <Route exact path ='/landingPage' component={LandingPage} />
          <Route component={Routes} />
      </Switch>
  )
}


export default App

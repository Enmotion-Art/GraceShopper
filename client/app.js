import React from 'react'
import { Provider } from 'react-redux'
import { Navbar } from './components'
import Routes from './routes'
import store from './store/index'
import { BrowserRouter as Router } from 'react-router-dom'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <Routes />
        </div>
      </Router>
    </Provider>
  )
}

export default App

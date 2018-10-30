import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { fetchAllArt } from '../store/art'


class AllArt extends Component {

  componentDidMount() {
    this.props.loadInitialArt()
    console.log('didMount')
  }

  render() {
    const allArt = this.props.allArt

    return (
      <div>
        <h1>ALL ART HERE</h1>
        <ul>
          {
            allArt.map(art =>
              <li key={art.id}>{art.name}</li>
            )
          }
        </ul>
      </div>
    )
  }
}

const mapStateToProp = state => {
  return {
    allArt: state.art.allArt
  }
}
const mapDispatchToProp = dispatch => {
  return {
    loadInitialArt: function() {
      dispatch(fetchAllArt())
    }
  }
}

export default withRouter(connect(mapStateToProp, mapDispatchToProp)(AllArt))

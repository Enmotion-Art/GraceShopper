import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { fetchAllArt } from '../store/art'


class AllArt extends Component {

  componentDidMount() {
    this.props.loadInitialArt()
  }

  render() {
    console.log('Hello it is all art')
    const allArt = this.props.allArt

    return (
      <div>
        <h1>ALL ART HERE</h1>
        {
           allArt.map(art =>

            <div key ={art.id}>
               <NavLink to={`/art/${art.id}`}> {art.title} </NavLink>
            </div>
           )
        }



      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allArt: state.art.allArt //possible .art addition
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadInitialArt: function() {
      dispatch(fetchAllArt())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllArt))

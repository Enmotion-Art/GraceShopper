import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { fetchSingleArt } from '../store/art'


class AllArt extends Component {

  componentDidMount() {
    const id= this.props.match.params.artId
    this.props.loadSingleArt(id)
    console.log('didMount')
  }

  render() {
    const singleArt = this.props.singleArt

    return (
      <div>
        <h1>Single Art</h1>
        <p>{singleArt.title}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleArt: state.art.singleArt
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadSingleArt: function(id) {
      dispatch(fetchSingleArt(id))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllArt))

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter, Link } from 'react-router-dom'
import { fetchSingleArt } from '../store/art'


class AllArt extends Component {

  componentDidMount() {
    const id= this.props.match.params.artId
    this.props.actions.loadSingleArt(id)
    console.log('didMount')
  }

  // async handleClick(event) {
  //   event.preventDefault();
  //   // this.render()
  // }

  render() {
    const singleArt = this.props.singleArt

    return (
      <div>
        <h1>Single Art</h1>
        <p>{singleArt.title}</p>
        <button
            type="button"
            id={`${singleArt.id}`}
            // onClick={this.handleClick}
            >
          X
        </button>
        <Link to={`/art/${singleArt.id}/edit`} activeClassName="active" id="editLink">
            Edit
          </Link>
        <br />
        <img src = {singleArt.image} />
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
    actions: {
      loadSingleArt: function(id) {
        dispatch(fetchSingleArt(id))
    }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllArt))

import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter, Link } from 'react-router-dom'
import { fetchSingleArt, removeArt } from '../store/art'


class AllArt extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const id= this.props.match.params.artId
    this.props.actions.loadSingleArt(id)
    console.log('didMount')
  }

  async handleClick(event) {
    event.preventDefault();
    const ArtId = event.target.id;
    await this.props.actions.removeSpecificArt({ id: ArtId });
  }

  render() {
    const singleArt = this.props.singleArt
    const user = this.props.user
    console.log('user type', user.UserType)

    return (
      <div>
         <button
            type="button"
            id={`${singleArt.id}`}
            onClick={this.handleClick}
            >
          X
        </button>
        {
          user.UserType === 'admin' ?
        <Link to={`/art/${singleArt.id}/edit`} activeClassName="active" id="editLink">
            Edit
          </Link> 
          : <div />
        }
        <br />
        <h1>{singleArt.title}</h1>
        <div id="container-row">
          <div id="column">
            <img src = {singleArt.image} />
          </div>
          <div id="second-column">
            <p>{singleArt.description}</p>
            <p>Style: {singleArt.category}</p>
            <p>{singleArt.width}W x {singleArt.height}H</p>
            <p><strong>${singleArt.price}</strong></p>
            { singleArt.quantity === 0 ? <p>SOLD OUT</p> :
            <button type="submit">Add to Cart</button> }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleArt: state.art.singleArt, 
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadSingleArt: function(id) {
        dispatch(fetchSingleArt(id))
    },
    removeSpecificArt: function(art) {
      dispatch(removeArt(art))
    }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllArt))

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchSingleArt, removeArt } from '../store/art'
import { fetchReviews } from '../store/review'
import Reviews from './Reviews'
import { me } from '../store/user'
import ChangeQuantity from './ChangeQuantity'

class SingleArt extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.artId
    this.props.actions.loadSingleArt(id)
    this.props.actions.onFetchReviews(id)
    this.props.actions.getMeAgain()
  }

  handleClick(event) {
    event.preventDefault();
    const ArtId = event.target.id;
    this.props.actions.removeSpecificArt({ id: ArtId });
  }

  render() {
    const singleArt = this.props.singleArt
    const user = this.props.user

    return (
      <div className='main-container'>

        <br />
        <div>
        <h1 className='yellow'>{singleArt.title}</h1>
        <div className='grid-child' id="container-row">
          <div id="column">
            <img src={singleArt.image} />
          </div>
          <div id="flex-col" className='red'>
            <p>{singleArt.description}</p>
            <p>Style: {singleArt.category}</p>
            <p>{singleArt.width}W x {singleArt.height}H</p>
            <p><strong>${singleArt.price}</strong></p>
              <ChangeQuantity product={this.props.singleArt} label="Add to Cart" />
              <p />
              <p />

              <div>
                {
                  user.UserType === 'admin' ?
                    <div>
                      <hr width="50%" align="RIGHT" color='white' size="1"/>
                      <h4 className = "yellow">Admin Functions</h4>

                      <button
                        type="button"
                        id={`${singleArt.id}`}
                        onClick={this.handleClick}
                      >
                        Delete
                      </button>
                      <p></p>
                      <button><Link to={`/art/${singleArt.id}/edit`} activeClassName="active" id="editLink" style={{color:"black"}}>
                        Edit
                  </Link></button>
                    </ div>
                    : <div />
              }
          </div>
          </div>
          </div>
          <p></p>
          <hr width="100%" align="LEFT"></hr>
          {
            this.props.reviews.length ?
              <div>
                <Reviews reviews={this.props.reviews} artId={this.props.singleArt.id} userId={this.props.user.id} />
              </div>
              : null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleArt: state.art.singleArt,
    user: state.user.singleUser,
    order: state.order.singleOrder,
    reviews: state.review.allReviews
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadSingleArt: function (id) {
        dispatch(fetchSingleArt(id))
      },
      removeSpecificArt: function (art) {
        dispatch(removeArt(art))
      },
      getMeAgain: function () { dispatch(me())
      },
      onFetchReviews: function (artId) {
        dispatch(fetchReviews(artId))
      }

    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleArt))

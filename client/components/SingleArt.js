import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { fetchSingleArt, removeArt } from '../store/art'


import { postOrder, putOrder } from '../store/order'
import { fetchReviews } from '../store/review'
import Reviews from './Reviews'
import { me } from '../store/user'
import store from '../store';




class SingleArt extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
    this.addtoCart = this.addtoCart.bind(this)
  }

  componentDidMount() {
    const id = this.props.match.params.artId
    this.props.actions.loadSingleArt(id)
    this.props.actions.onFetchReviews(id)
    store.dispatch(me())


  }

  handleClick(event) {
    event.preventDefault();
    const ArtId = event.target.id;
    this.props.actions.removeSpecificArt({ id: ArtId });
  }

  addtoCart(event) {
    event.preventDefault()
    if(!this.props.user.id) {
      if (!JSON.parse(localStorage.getItem('product'))) {
        localStorage.setItem('product', JSON.stringify([this.props.singleArt]))
      } else {
        let productArr = JSON.parse(localStorage.getItem('product'));
        productArr.push(this.props.singleArt)
        localStorage.setItem('product', JSON.stringify(productArr))
      }
    } else {
      this.props.actions.editOrder('created', this.props.order.id, null, null, [this.props.singleArt.id])
    }
  }

  render() {

    console.log("USER IN SINGLE ART", this.props.user)
    console.log("ORDER ON STATE", this.props.order)
    console.log("REVIEWS IN SINGLE ART", this.props.reviews)
    
    const singleArt = this.props.singleArt
    const user = this.props.user

    return (
      <div className='grid'>
        {
          user.UserType === 'admin' ?
            <div className='grid-child'>
              <button
                type="button"
                id={`${singleArt.id}`}
                onClick={this.handleClick}
              >
                X
        </button>
              <Link to={`/art/${singleArt.id}/edit`} activeClassName="active" id="editLink">
                Edit
          </Link>
            </ div>
            : <div />
        }
        <br />
        <h1>{singleArt.title}</h1>
        <div className='grid-child' id="container-row">
          <div id="column">
            <img src={singleArt.image} />
          </div>
          <div id="second-column">
            <p>{singleArt.description}</p>
            <p>Style: {singleArt.category}</p>
            <p>{singleArt.width}W x {singleArt.height}H</p>
            <p><strong>${singleArt.price}</strong></p>
            {singleArt.quantity === 0 ? <p>SOLD OUT</p> :
              <button type="submit" onClick={this.addtoCart}>Add to Cart</button>}
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
      editOrder: function (status, id, page, orderInfo, productIds) {
        dispatch(putOrder(status, id, page, orderInfo, productIds))
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

import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { postReview } from '../store/review'


class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleSubmit(event) {
    event.preventDefault()
    const artId = this.props.match.params.artId //open to figure out how to get artId
    const userId = 1 //open to figure out how to get userId. userId doesn't persist after refresh

    const stars = event.target.stars.value
    const content = event.target.comment.value
    this.props.onPostReview(artId,
      {
        stars,
        content,
        userId
      })

    this.props.history.push(`/art/${artId}`)

  }

  render() {
    console.log("USER IN REVIEWFORM", this.props.user)


    return (
      <div className='grid' id="container-row">
        <div className='grid-child'>
          <form id='reviewForm' onSubmit={this.handleSubmit}>
            <h2>Review Below</h2>
            <label>Overall Rating</label>
            <div className="rate">
              <input type="radio" id="star5" name="stars" value="5" />
              <label htmlFor="star5" title="text">5 stars</label>
              <input type="radio" id="star4" name="stars" value="4" />
              <label htmlFor="star4" title="text">4 stars</label>
              <input type="radio" id="star3" name="stars" value="3" />
              <label htmlFor="star3" title="text">3 stars</label>
              <input type="radio" id="star2" name="stars" value="2" />
              <label htmlFor="star2" title="text">2 stars</label>
              <input type="radio" id="star1" name="stars" value="1" />
              <label htmlFor="star1" title="text">1 star</label>
            </div>

            <p />

            <textarea name="comment" rows="4" cols="50" onChange={this.handleChange} />

            <p />

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.singleUser,
    singleArt: state.art.singleArt,
    singleReview: state.review.singleReview

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPostReview: (artId, userId, review) => dispatch(postReview(artId, userId, review))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewForm))



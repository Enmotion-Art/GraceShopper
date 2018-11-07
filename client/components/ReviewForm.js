import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { postReview } from '../store/review'
import { fetchSingleArt} from '../store/art'



class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.actions.onFetchSingleArt(this.props.match.params.artId)
  }


  handleSubmit(event) {
    event.preventDefault()
    const artId = this.props.match.params.artId
    const userId = this.props.user.id

    const stars = event.target.stars.value
    const content = event.target.comment.value
    this.props.actions.onPostReview(artId,
      {
        stars,
        content,
        userId
      })

    this.props.history.push(`/art/${artId}`)

  }

  render() {
    const artImage = this.props.singleArt.image

    if (this.props.user.id)
      return (
        <div className='main-container'>
          <div className='review-grid'>

            <div className='review-grid-child'><h2>Review Below</h2>
              <label>Let us know what you think!</label>
              <img src = {artImage} />
              <p/>
            </div>

            <form className='review-grid-child' id='reviewForm' onSubmit={this.handleSubmit}>
             <div>
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
              </div>

              <div>
                <textarea id='textarea' name="comment" rows="4" cols="50" onChange={this.handleChange} />
              </div>

              <div><button type="submit">Submit</button></div>
            </form>
          </div>
        </div>
      )

    else return (
      // this.props.history.push('/')
      <div></div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.singleUser,
    singleArt: state.art.singleArt,
    singleReview: state.review.singleReview,
    art: state.art.allArt

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      onPostReview: (artId, userId, review) => dispatch(postReview(artId, userId, review)),
      onFetchSingleArt: (artId) => dispatch(fetchSingleArt(artId))
    }

  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewForm))



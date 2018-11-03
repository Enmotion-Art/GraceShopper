import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { postReview } from '../store/review'


class ReviewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stars: 0,
      comment: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
    console.log('STATE IN REVIEW', this.state)
  }

  handleSubmit(event) {
    event.preventDefault()
    const artId = this.props.match.params.artId //open to figure out how to get artId
    const stars = event.target.stars.value
    const content = event.target.comment.value
    console.log('STARS', stars)
    console.log('CONTENT', content)
    this.props.onPostReview(artId,
      {
        stars,
        content
      })
  }

  render() {
    console.log(this.props)


    return (
      <div className='grid' id="container-row">
        <div className='grid-child'>
          <form id='reviewForm' onSubmit={this.handleSubmit}>
            <h2>Review Below</h2>
            <label>Overall Rating</label>
            <div className="rate">
              <input type="radio" id="star5" name="stars" value="5" onClick={this.handleChange} />
              <label htmlFor="star5" title="text">5 stars</label>
              <input type="radio" id="star4" name="stars" value="4" onClick={this.handleChange} />
              <label htmlFor="star4" title="text">4 stars</label>
              <input type="radio" id="star3" name="stars" value="3" onClick={this.handleChange} />
              <label htmlFor="star3" title="text">3 stars</label>
              <input type="radio" id="star2" name="stars" value="2" onClick={this.handleChange} />
              <label htmlFor="star2" title="text">2 stars</label>
              <input type="radio" id="star1" name="stars" value="1" onClick={this.handleChange} />
              <label htmlFor="star1" title="text">1 star</label>
            </div>
            <p></p>

            <textarea name="comment" rows="4" cols="50" onChange={this.handleChange} />
            <p></p>

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
    onPostReview: (artId, review) => dispatch(postReview(artId, review))
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReviewForm))



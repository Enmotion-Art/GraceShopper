import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

//Helper function to show stars given by a user
const printStars = (stars) => {
  let output = []
  let count = 0
  while (count < 5) {
    if (count < stars)
      output.push(<span className="fa fa-star checked" key={count} />)
    else
      output.push(<span className="fa fa-star" key={count} />)
    count++
  }
  return output
}

// Helper function to format Date (i.e. November 3rd, 2018 )
const formatDate = (date) => {
  const dateformat = require('dateformat')
  return dateformat(date, 'mmmm dS, yyyy')
}

//Helper function to calculate average stars for a single product
const avgStars = (reviews) => {
  let result = 0
  reviews.forEach(review =>
    result += review.stars
  )
  let average = Math.round(result / (reviews.length * 5) * 5)
  let output = [];
  let count = 0;
  while (count < 5) {
    if (count < average)
      output.push(<span className="fa fa-star checked" key={count} />)
    else
      output.push(<span className="fa fa-star" key={count} />)
    count++
  }
  return output
}


const Reviews = (props) => {
  const reviews = props.reviews
  const user = props.user

  return (
    <div className='review-container'>
      <h3>Customer Reviews</h3>
      <p><strong>{reviews.length} customer reviews</strong></p>
      <p><strong>Avg ratings: {avgStars(reviews)}</strong></p>
      <hr width="100%" align="LEFT" color='#233237'/>
      {
        reviews.map(review =>
          <div key={review.id} >
            <p>Reviewed By: {user.firstName} {user.lastName} </p>
            <p>{formatDate(review.createdAt)}</p>
            <p>{printStars(review.stars)}</p>
            <p>{review.content}</p>
            <hr width="100%" align="LEFT" color='lightgrey' />
          </div>
        )
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user.singleUser,
    reviews: state.review.allReviews
  }
}



export default withRouter(connect(mapStateToProps)(Reviews))





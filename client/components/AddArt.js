import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postArt } from '../store/art'
import ArtForm from './ArtForm'

class AddArt extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      price: '',
      quantity: '',
      image: '',
      height: '',
      width: '',
      depth: '',
      category: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const price = +this.state.price;
    const quantity = +this.state.quantity;
    const image = this.state.image;
    const height = +this.state.height;
    const width = +this.state.width;
    const depth = +this.state.depth;
    const category = this.state.category;

    this.setState({
      title: '',
      description: '',
      price: '',
      quantity: '',
      image: '',
      height: '',
      width: '',
      depth: '',
      category: ''
    })
    this.props.addArt({
      title,
      description,
      price,
      quantity,
      image,
      height,
      width,
      depth,
      category
    })
  }

  render() {
    return (
      <ArtForm title={this.props.title} state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  addArt: (art) => dispatch(postArt(art))
})

export default connect(null, mapDispatchToProps)(AddArt)

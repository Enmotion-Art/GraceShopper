import React, { Component } from 'react'
import { connect } from 'react-redux'
import ArtForm from './ArtForm'
import {putArt } from '../store/art'

class EditArt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.currentArt.title,
      description: props.currentArt.description,
      price: props.currentArt.price,
      quantity: props.currentArt.quantity,
      image: props.currentArt.image,
      height: props.currentArt.height,
      width: props.currentArt.width,
      depth: props.currentArt.depth,
      category: props.currentArt.category
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
    const price = this.state.price;
    const quantity = this.state.quantity;
    const image = this.state.image;
    const height = this.state.height;
    const width = this.state.width;
    const depth = this.state.depth;
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
      this.props.editArt({ title,
        description,
        price,
        quantity,
        image,
        height,
        width,
        depth,
        category}, this.props.currentArt.id)   
    }

  render() {
    return (
        <ArtForm title={this.props.title} state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    )
  }
}
const mapStateToProps = (state) => ({
    currentArt: state.art.singleArt
})
const mapDispatchToProps = (dispatch) => ({
  editArt: (art, id) => dispatch(putArt(art, id))
})


export default connect(mapStateToProps, mapDispatchToProps)(EditArt)

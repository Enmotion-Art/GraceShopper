import React from 'react'

const ArtForm = (props) => {
    return (
      <div>
        <form >
          <fieldset>
            <legend className='yellow'>{props.title}</legend>

            <label className='yellow'> Title of Artwork: </label>
            <input type="text" name="title" onChange={props.handleChange} value={props.state.title} />

            <label className='yellow'> Description: </label>
            <input type="text" name="description" onChange={props.handleChange} value={props.state.description} />

            <label className='yellow'> Price: </label>
            <input type="text" name="price" onChange={props.handleChange} value={props.state.price} />

            <label className='yellow'> Quantity: </label>
            <input type="text" name="quantity" onChange={props.handleChange} value={props.state.quantity} />

            <label className='yellow'> Image: </label>
            <input type="text" name="image" onChange={props.handleChange} value={props.state.image} />

            <label className='yellow'> Height: </label>
            <input type="text" name="height" onChange={props.handleChange} value={props.state.height} />

            <label className='yellow'> Width: </label>
            <input type="text" name="width" onChange={props.handleChange} value={props.state.width} />

            <label className='yellow'> Depth: </label>
            <input type="text" name="depth" onChange={props.handleChange} value={props.state.depth} />

            <label className='yellow'> Category: </label>
            <input type="text" name="category" onChange={props.handleChange} value={props.state.category} />

            <button type="submit" onClick={props.handleSubmit}> Submit</button>
          </fieldset>
        </form>
      </div>
    )
  }

  export default ArtForm

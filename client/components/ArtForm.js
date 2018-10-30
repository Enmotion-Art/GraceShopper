import React from 'react'

const ArtForm = (props) => {
    return (
      <div>
        <form>
          <fieldset>
            <legend>{props.title}</legend>

            <label> Title of Artwork: </label>
            <input type="text" name="title" onChange={props.handleChange} value={props.state.title} />

            <label> Description: </label>
            <input type="text" name="description" onChange={props.handleChange} value={props.state.description} />
  
            <label> Price: </label>
            <input type="text" name="price" onChange={props.handleChange} value={props.state.price} />

            <label> Quantity: </label>
            <input type="text" name="quantity" onChange={props.handleChange} value={props.state.quantity} />

            <label> Image: </label>
            <input type="text" name="image" onChange={props.handleChange} value={props.state.image} />
  
            <label> Height: </label>
            <input type="text" name="height" onChange={props.handleChange} value={props.state.height} />

            <label> Width: </label>
            <input type="text" name="width" onChange={props.handleChange} value={props.state.width} />

            <label> Depth: </label>
            <input type="text" name="depth" onChange={props.handleChange} value={props.state.depth} />

            <label> Category: </label>
            <input type="text" name="category" onChange={props.handleChange} value={props.state.category} />
  
            <button type="submit" onClick={props.handleSubmit}> Submit</button>
          </fieldset>
        </form>
      </div>
    )
  }
  
  export default ArtForm
  
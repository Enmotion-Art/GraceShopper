import React, { Component } from 'react'
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { fetchAllArt } from '../store/art'


class AllArt extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.artFilter = this.artFilter.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialArt()
  }


  artFilter (category) {
    const allArt = this.props.allArt

    if (category === 'priceOne') return allArt.filter(art => art.price<100)
    if (category === 'priceTwo') return allArt.filter(art => art.price<301 && art.price>=100)
    if (category === 'priceThree') return allArt.filter(art => art.price<500 && art.price>300)
    if (category === 'priceFour') return allArt.filter(art => art.price>500)
  }

  handleSelect(event) {
    const category = event.target.value
    this.setState({
        [event.target.name]: this.artFilter(category)
       });

    console.log(this.state.selectedArt)
   }


  render() {
    const allArt = this.props.allArt
    const selectedArt = this.state.selectedArt

    return (
      <div>

        <div>
            <label>Filter by Price</label>
            <select name='selectedArt' onChange={this.handleSelect}>
                <option></option>
                <option value='priceOne'  >Under $100</option>
                <option value='priceTwo'  >$100 - $300 </option>
                <option value='priceThree'  > $301 - $500</option>
                <option value='priceFour'  > Over $500</option>
            </select>
        </div>

        <div>
        <h1>Buy Art! Feel Special</h1>
            {
              selectedArt ?

              selectedArt.map(art =>
              <div key ={art.id}>
              <NavLink to={`/art/${art.id}`}> {art.title} </NavLink>
              <img src = {art.image} />
              </div>
            )
             :
              allArt.map(art =>
              <div key ={art.id}>
              <NavLink to={`/art/${art.id}`}> {art.title} </NavLink>
              <img src = {art.image} />
              </div>
            )
            }
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allArt: state.art.allArt //possible .art addition
  }
}
const mapDispatchToProps = dispatch => {
  return {
    loadInitialArt: function() {
      dispatch(fetchAllArt())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllArt))

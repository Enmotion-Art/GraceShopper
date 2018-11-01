import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { fetchAllArt } from '../store/art'
import Pagination from './Pagination';


class AllArt extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedArt: null, //inital null value to account for when an art doesn't match any category. Has to do with if/else stmt in the render. Subject to change.
    }

    this.handleSelect = this.handleSelect.bind(this)
    this.artFilter = this.artFilter.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialArt()
  }


  artFilter(category) {
    const allArt = this.props.allArt

    if (category === 'priceAll') return allArt
    if (category === 'priceOne') return allArt.filter(art => art.price < 100)
    if (category === 'priceTwo') return allArt.filter(art => art.price < 301 && art.price >= 100)
    if (category === 'priceThree') return allArt.filter(art => art.price < 500 && art.price > 300)
    if (category === 'priceFour') return allArt.filter(art => art.price > 500)
  }

  categoryFilter(category) {
    const allArt = this.props.allArt

    if (category === 'priceAll') return allArt
    if (category === 'priceOne') return allArt.filter(art => art.price < 100)
    if (category === 'priceTwo') return allArt.filter(art => art.price < 301 && art.price >= 100)
    if (category === 'priceThree') return allArt.filter(art => art.price < 500 && art.price > 300)
    if (category === 'priceFour') return allArt.filter(art => art.price > 500)
  }

  handleSelect(event) {
    const category = event.target.value
    this.setState({
      [event.target.name]: this.artFilter(category)
    });
  }

  handlePageChange(page) {
    const renderedArt = this.props.allArt.slice((page - 1) * 2, (page - 1) * 2 + 2)
    this.setState({
      renderedArt: renderedArt,
      activePage: page
    });

  }

  render() {
    const allArt = this.props.allArt
    const selectedArt = this.state.selectedArt

    return (
      <div>

        <div>
          <label>Filter by Price</label>
          <select name='selectedArt' onChange={this.handleSelect}>
            <option value='priceAll'>All Prices</option>
            <option value='priceOne'  >Under $100</option>
            <option value='priceTwo'  >$100 - $300 </option>
            <option value='priceThree'  > $301 - $500</option>
            <option value='priceFour'  > Over $500</option>
          </select>
        </div>

        <div>
          <label>Filter by Category</label>
          <select name='selectedArt' onChange={this.handleSelect}>
            <option value='realism'>Realism</option>
            <option value='psyche'  >Psyche</option>
            <option value='socialJustice'  >Social Justice</option>
            <option value='inspiredBy'  > Inspired by... </option>
          </select>
        </div>

        <div>
          <h1>Buy Art! Feel Special</h1>
          {
            selectedArt ?

              selectedArt.map(art =>
                <div key={art.id}>
                  <NavLink to={`/art/${art.id}`}> {art.title} </NavLink>
                  <img src={art.image} />
                </div>
              )
              :
              allArt.map(art =>
                <div key={art.id}>
                  <NavLink to={`/art/${art.id}`}> {art.title} </NavLink>
                  <img src={art.image} />
                </div>
              )
          }
        </div>

        <Pagination allArt={allArt} />

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allArt: state.art.allArt
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitialArt: function () {
      dispatch(fetchAllArt())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllArt))

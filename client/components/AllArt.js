import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { fetchAllArt } from '../store/art'
import { me } from '../store/user'

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
    this.props.loadInitialArt();
    this.props.getMeAgain()
  }

  artFilter (category) {

    const allArt = this.props.allArt

    if (category === 'All') return allArt

    if (category === 'priceOne') return allArt.filter(art => art.price < 100)
    if (category === 'priceTwo') return allArt.filter(art => art.price < 301 && art.price >= 100)
    if (category === 'priceThree') return allArt.filter(art => art.price < 500 && art.price > 300)
    if (category === 'priceFour') return allArt.filter(art => art.price > 500)

    if (category === 'Psyche') return allArt.filter(art => art.category === 'Psyche')
    if (category === 'Inspired by...') return allArt.filter(art => art.category === 'Inspired by...')
    if (category === 'Social Justice') return allArt.filter(art => art.category === 'Social Justice')
    if (category === 'Realism') return allArt.filter(art => art.category === 'Realism')
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
    const filteredArt = allArt.filter(elem => elem.quantity > 0)
    const selectedArt = this.state.selectedArt

    return (

      <div className='main-container'>

        <div className='yellow'>
          {this.props.user.singleUser.id ?
          <h1>Welcome, {this.props.user.singleUser.firstName}!</h1>
          : <h1 />}
        </div>
        <p />
        <p />
        <div className='filter'>
        <div  className='filter-child'>
          <label className='red'>Filter by Price</label>
          <select name='selectedArt' onChange={this.handleSelect}>
            <option value='All'>All Art</option>
            <option value='priceOne'  > Under $100 </option>
            <option value='priceTwo'  >$100 - $300 </option>
            <option value='priceThree'  > $301 - $500</option>
            <option value='priceFour'  > Over $500  </option>
          </select>
        </div>

        <div className='filter-child'>
          <label className='red'>Filter by Category</label>
          <p />
          <select name='selectedArt' onChange={this.handleSelect}>
            <option></option>
            <option value='Psyche'> Psyche </option>
            <option value='Realism'> Realism </option>
            <option value='Social Justice'> Social Justice </option>
            <option value='Inspired by...'> Inspired By </option>
          </select>
          </div>
        </div>
          <div className='grid'>
          {
            selectedArt ?


              selectedArt.map(art =>
                <div className='grid-child' key={art.id}>
                <div>
                  <NavLink to={`/art/${art.id}`}><img id="main-art" src={art.image} /> </NavLink>
                </div>
                <div className='flex-col'>
                  <NavLink to={`/art/${art.id}`}>{art.title}</NavLink>
                  <div id='price'>{`$ ${art.price}`}</div>
                </div>
                </div>
              )
              :
              filteredArt.map(art =>
                <div className='grid-child' key={art.id}>
                <div>
                  <NavLink to={`/art/${art.id}`}><img id="main-art" src={art.image} /> </NavLink>
                </div>
                <div className='flex-col'>
                  <NavLink to={`/art/${art.id}`}>{art.title}</NavLink>
                  <div className='red'>{`$ ${art.price}`}</div>
                </div>
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
    allArt: state.art.allArt,
    user: state.user,
    order: state.order
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadInitialArt: function () {
      dispatch(fetchAllArt())
    },
    getMeAgain: function() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllArt))

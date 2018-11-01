import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { fetchSingleOrder, removeOrder } from '../store/order'


class SingleOrder extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
  }


  componentDidMount() {
    const id= this.props.match.params.orderId
    this.props.actions.loadSingleOrder(id)
    console.log('didMount')
  }

  handleClick(event) {
    event.preventDefault();
    const OrderId = event.target.id;
    this.props.actions.removeSpecificOrder({ id: OrderId });
  }

  render() {
    const singleOrder = this.props.singleOrder
    const user = this.props.user

    return (
      <div className='grid'>
        {
          user.UserType === 'admin' ?
          <div className='grid-child'>
          <button
            type="button"
            id={`${singleOrder.id}`}
            onClick={this.handleClick}
            >
          X
        </button>
        <Link to={`/art/${singleOrder.id}/edit`} activeClassName="active" id="editLink">
            Edit
          </Link>
          </ div>
          : <div />
        }
        <br />
        <h1>OrderID: {singleOrder.id}</h1>
        <div className='grid-child' id="container-row">
          <div id="second-column">

            <p>MORE ORDER INFO HERE</p>

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleOrder: state.order.singleOrder,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadSingleOrder: function(id) {
        dispatch(fetchSingleOrder(id))
    },
    removeSpecificOrder: function(order) {
      dispatch(removeOrder(order))
    }
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleOrder))

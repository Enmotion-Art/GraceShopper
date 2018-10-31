import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'


const Child = ({ id }) => <div>content for id {id}</div>

class Pagination extends React.Component {
  constructor() {
    super()
    this.state = {
      page: 0,
  }
    this.createPages = this.createPages.bind(this)
  }

  showPreviousPage = () => {
    if (this.state.page-1>=0) {
      this.setState(state => ({
        // limit the page number to no less than 0
        page: state.page - 1,
      }))
    }
  }

  showNextPage = (totalPages) => {
    if (this.state.page+1<totalPages) {
      this.setState(state => ({
        // limit the page number to no greater than 2
        page: state.page + 1,
      }))
    }
  }

  createPages = (totalPages) => {
    const pages = []
    for (let i=1; i<totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  render() {
    // an example list of all item IDs we can show
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8]

    // the number of items we want to display
    const itemsToDisplay = 3

    const startIndex = this.state.page * itemsToDisplay
    const visibleItems = items.slice(startIndex, startIndex + itemsToDisplay)
    const totalPages = Math.floor(items.length/itemsToDisplay)

    return (
      <div>
        <p>Current page: {this.state.page}</p>


        <div className="pagination">
          <p onClick={this.showPreviousPage}>&laquo;</p>
          {
            this.createPages(totalPages).map(pageNum =>
              <p key={pageNum}>{pageNum}</p>
            )
          }
        <p onClick={() => this.showNextPage(totalPages)}>&raquo;</p>
        </div>



          {visibleItems.map(id => <Child id={id} key={id} />)}

      </div>
    )
  }
}

  export default Pagination

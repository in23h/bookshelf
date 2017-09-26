import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

import { Link } from 'react-router-dom'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  onUpdateShelf = (book, event) => {
    this.props.onUpdateShelf(book, event)
  }

  render() {
    const { books } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">

          <Shelf title={'Currently Reading'} onUpdateShelf={this.onUpdateShelf} books={ books.filter((book) => {
            return book.shelf === 'currentlyReading'
          }) } />
          <Shelf title={'Want To Read'} onUpdateShelf={this.onUpdateShelf} books={ books.filter((book) => {
            return book.shelf === 'wantToRead'
          }) } />
          <Shelf title={'Read'} onUpdateShelf={this.onUpdateShelf} books={ books.filter((book) => {
            return book.shelf === 'read'
          }) } />

        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {
  static propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
  }

  render() {
    const { books, title } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book onUpdateShelf={this.props.onUpdateShelf} book={book} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf

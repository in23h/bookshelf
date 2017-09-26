import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
  }

  render() {
    const { book, onUpdateShelf } = this.props
    return (
      <div className="book">
        <div className="book-top">
          <div className={`book-cover ${(book.shelf !== 'none') ? book.shelf : ''}`} style={{ width: 128, height: 193, backgroundImage: (book.imageLinks) ? `url(${book.imageLinks.thumbnail})` : `url(https://placeimg.com/128/193/arch/sepia)` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf || 'none'} onChange={(event) => onUpdateShelf(book, event)}>
              <option value="moveTo" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{ book.title }</div>
        <div className="book-authors">{ book.author }</div>
      </div>
    )
  }
}

export default Book

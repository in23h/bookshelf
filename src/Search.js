import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import sortBy from 'sort-by'

class Search extends Component {
  static propTypes = {
    onUpdateShelf: PropTypes.func.isRequired
  }

  state = {
    searchResults: [],
    query: ''
  }

  updateQuery = (query) => {
    if (query !== this.state.query) {
      this.setState({ query: query.trim() })
      if(query.length > 1){ //Returned a 403 error on searching a query with a single character
          this.searchBooks(this.state.query)
      }
    }
  }

  onUpdateShelf = (book, event) => {
    this.props.onUpdateShelf(book, event)
  }

  searchBooks(query) {
    BooksAPI.search(query).then((searchResults) => {
      if(searchResults !== null && searchResults !== undefined) {
        this.props.books.forEach((book) => {
          searchResults.map((b) => { return b.id === book.id ? (b.shelf = book.shelf, b) : b})
        })
        searchResults.sort(sortBy('title'))
        this.setState({ searchResults })
      }
    })
  }
  render() {
    const { searchResults, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author" value={query}
            onChange={(event) => this.updateQuery(event.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

            {searchResults !== '' && searchResults.map((book) => (
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

export default Search

import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import sortBy from 'sort-by'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    //Get all books that are on shelves
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateShelf = (book, event) => {
    //Get current list of books on shelves
    let updateBooks = this.state.books

    //update the selected book with the new shelf selection
    const selectedShelf = event.target.value
    book.shelf = selectedShelf

    //1. Update the database with the new book and shelf
    BooksAPI.update(book, selectedShelf).then(() => {
      //2. Do the following:
      //A. Change shelf if book is already on a shelf
      updateBooks = updateBooks.map((b) => { return b.id === book.id ? (b.shelf = selectedShelf, book) : (b)})

      //B. Remove books with shelf of none
      updateBooks = updateBooks.filter((book) => book.shelf !== 'none')

      //C. From search results, if book is not on a shelf, add it to the list of books
      updateBooks.every((b) => {return b.id !== book.id}) ? updateBooks.push(book) : ''

      //D. Sort by title
      updateBooks.sort(sortBy('title'))

      //3. Set the state to the new list
      this.setState({books: updateBooks})

    })
  }

  render() {
    console.log('z', process.env.PUBLIC_URL)
    return (
      <div className="app">
        <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateShelf={this.updateShelf}
          />
        )} />
        <Route path={`${process.env.PUBLIC_URL}/search`} render={({ history }) => (
          <Search
            books={this.state.books}
            onUpdateShelf={this.updateShelf}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp

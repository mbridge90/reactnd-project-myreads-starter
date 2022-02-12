import Bookshelf from "./Bookshelf";
import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

class ListBooks extends React.Component {
  state = {
    books: [],
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books: books
        })
      })
  }

  // This function is called when moving books around the shelves rather than re-querying the API
  // after the call to update the individual book listing.
  updateLocalBooks(id, newShelf) {
    let books = [...this.state.books]
    for (let book of books) {
      if (book.id === id) {
        book['shelf'] = newShelf;
        this.setState({
          books: books
        })
      }
    }
  }

  render() {
    const shelfKeys = {
      "currentlyReading": "Currently Reading",
      "wantToRead": "Want to Read",
      "read": "Read"
    }

    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {Object.keys(shelfKeys).map(
                  (key) => (
                    <Bookshelf
                      key={key}
                      shelfName={shelfKeys[key]}
                      books={this.state.books.filter((book) => book["shelf"] === key)}
                      updateLocalShelves={this.updateLocalBooks.bind(this)}
                    />
                  )
              )}
            </div>
          </div>
          <Link to='/search' className="open-search">
            <button>Add a book</button>
          </Link>
        </div>
    )
  }
}

export default ListBooks;

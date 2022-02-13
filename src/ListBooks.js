import Bookshelf from "./Bookshelf";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

class ListBooks extends React.Component {

  componentDidMount() {
    this.props.getBooks()
  }


  render() {
    const shelfKeys = {
      "currentlyReading": "Currently Reading",
      "wantToRead": "Want to Read",
      "read": "Read"
    }

    const { books, updateLocalShelves } = this.props

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
                      books={books.filter((book) => book["shelf"] === key)}
                      updateLocalShelves={updateLocalShelves}
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

ListBooks.propTypes ={
  getBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default ListBooks;

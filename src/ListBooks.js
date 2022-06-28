import Bookshelf from "./Bookshelf";
import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function ListBooks (props) {

  const { books, updateLocalShelves, getBooks } = props

  useEffect(() => { getBooks() }, [])

  console.log("In ListBooks", books);

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

ListBooks.propTypes ={
  getBooks: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default ListBooks;

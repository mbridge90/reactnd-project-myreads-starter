import React from 'react'
import './App.css'
import Book from "./Book";
import PropTypes from 'prop-types';

function BooksGrid ({ books, updateLocalShelves }) {
  return (
    <ol className="books-grid">
      {books.map((book) =>
        <li key={book.id}>
          <Book
            id={book.id || 0}
            shelf={book.shelf}
            title={book.title}
            cover={book['imageLinks']?.['thumbnail']}
            authors={book.authors?.join(', ')}
            updateLocalShelves={updateLocalShelves}/>
        </li>
      )}
    </ol>
  )
}

BooksGrid.propTypes = {
  books: PropTypes.array.isRequired,
  updateLocalShelves: PropTypes.func.isRequired
}

export default BooksGrid;

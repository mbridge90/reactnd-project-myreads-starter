import React from 'react'
import './App.css'
import BooksGrid from "./BooksGrid";
import PropTypes from "prop-types";

function Bookshelf (props) {
  console.log("Bookshelf", props.books)

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.shelfName}</h2>
      <div className="bookshelf-books">
        <BooksGrid books={props.books} updateLocalShelves={props.updateLocalShelves}/>
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  updateLocalShelves: PropTypes.func.isRequired
}

export default Bookshelf;

import React, {useEffect, useState} from 'react'
import './App.css'
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

function Book (props) {
  const{ updateLocalShelves, id, cover, title, authors, shelf } = props

  const [currentShelf, setCurrentShelf] = useState(shelf || "none")

  const handleUpdate = (e) => {
    setCurrentShelf(e.target.value);
    updateLocalShelves(id, e.target.value);
    updateBook(id, e.target.value);
  }

  const updateBook = (id, newShelf) => {
    BooksAPI.update(id, newShelf)
        .then(() => console.log("Updated successfully in database"),
       () => console.log("Update in database failed"))
  }

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{
          width: 128,
          height: 193,
          backgroundImage: `url(${cover})`
        }
        }/>
        <div className="book-shelf-changer">
          <select onChange={handleUpdate} value={currentShelf}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  )
}

Book.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  authors: PropTypes.string,
  id: PropTypes.string,
  updateLocalShelves: PropTypes.func,
  currentShelf: PropTypes.string
}

export default Book;

import React, {useState} from 'react'
import './App.css'
import BooksGrid from "./BooksGrid";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const debounce = (callback, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  }
}

function SearchPage ({ books, updateLocalShelves }) {

  const [searchResults, setSearchResults] = useState([])

  const updateSearchResults = (results) => {
    let modifiedSearchResults = results
    for (let result of modifiedSearchResults) {
      for (let book of books) {
        if (result['id'] === book['id']) {
          result['shelf'] = book['shelf']
        }
      }
    }
    setSearchResults(modifiedSearchResults)
  }

  const handleSearch =  debounce(query => {
    if (query) {
      BooksAPI.search(query)
        .then((results) => {
          updateSearchResults(results)
        })
    } else {
      updateSearchResults([])
    }
  }, 250)


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' >
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
            <input type="text" placeholder="Search by title or author"
                   onChange={(event) => handleSearch(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          {searchResults.length > 0 ?
            <BooksGrid
              books={searchResults}
              updateLocalShelves={updateLocalShelves}
            /> : <p>No results found matching your search</p>}
        </div>
      </div>
    )

}

SearchPage.propTypes = {
  books: PropTypes.array,
  updateLocalShelves: PropTypes.func
}

export default SearchPage;

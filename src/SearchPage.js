import React from 'react'
import './App.css'
import BooksGrid from "./BooksGrid";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

class SearchPage extends React.Component {
  state = {
    searchResults: [],
  }

  updateSearchResults (books) {
    this.setState({
      searchResults: books
    })
  }

  handleSearch (query) {
    if (query) {
      BooksAPI.search(query)
        .then((results) => {
          this.updateSearchResults(results)
        })
    } else {
      this.updateSearchResults([])
    }
  }

  render () {
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
                     onChange={(event) => this.handleSearch(event.target.value)}/>
            </div>
          </div>
          <div className="search-books-results">
            {this.state.searchResults.length > 0 ?
                <BooksGrid books={this.state.searchResults}/> : <p>No results found matching your search</p>}
          </div>
        </div>
    )
  }
}

export default SearchPage;

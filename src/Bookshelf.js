import React from 'react'
import './App.css'
import BooksGrid from "./BooksGrid";

class Bookshelf extends React.Component {
  render() {
    return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.shelfName}</h2>
          <div className="bookshelf-books">
            <BooksGrid books={this.props.books} updateLocalShelves={this.props.updateLocalShelves}/>
          </div>
        </div>
    )
  }
}

export default Bookshelf;

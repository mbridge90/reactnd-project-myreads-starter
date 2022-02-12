import React from 'react'
import './App.css'
import Book from "./Book";

class BooksGrid extends React.Component {
  render() {
    return (
        <ol className="books-grid">
          {this.props.books.map((book) =>
              <li key={book.id}>
                <Book id={book.id}
                      shelf={book.shelf}
                      title={book.title}
                      cover={book['imageLinks']?.['thumbnail']}
                      author={book.authors?.[0]}
                      updateLocalShelves={this.props.updateLocalShelves}/>
              </li>
          )}
        </ol>
    )
  }
}

export default BooksGrid;

 import React from 'react'
import './App.css'
import ListBooks from "./ListBooks"
import SearchPage from "./SearchPage"
 import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
 import * as BooksAPI from "./BooksAPI";


 class BooksApp extends React.Component {
   state = {
     books: [],
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
   updateLocalShelves(id, newShelf) {
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
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={
            <ListBooks
                getBooks={this.getBooks.bind(this)}
                updateLocalShelves={this.updateLocalShelves.bind(this)}
                books={this.state.books}
            />}
          />
          <Route path='/search' element={
            <SearchPage
                books={this.state.books}
                updateLocalShelves={this.updateLocalShelves.bind(this)}
            />}
          />
        </Routes>
      </Router>
    )
  }
}

export default BooksApp

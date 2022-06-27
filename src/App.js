 import React, {useState} from 'react'
import './App.css'
import ListBooks from "./ListBooks"
import SearchPage from "./SearchPage"
 import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
 import * as BooksAPI from "./BooksAPI";

 function BooksApp () {
   const [books, setBooks] = useState([])

   const getBooks = () => {
     BooksAPI.getAll()
       .then((books) => {
         setBooks(books)
       })
   }

   // This function is called when moving books around the shelves rather than re-querying the API
   // after the call to update the individual book listing.
   const updateLocalShelves = (id, newShelf) => {
     let books = [...books]
     for (let book of books) {
       if (book.id === id) {
         book['shelf'] = newShelf;
         setBooks(books)
       }
     }
   }

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={
          <ListBooks
            getBooks={getBooks}
            updateLocalShelves={updateLocalShelves}
            books={books}
          />}
        />
        <Route path='/search' element={
          <SearchPage
            books={books}
            updateLocalShelves={updateLocalShelves}
          />}
        />
      </Routes>
    </Router>
  )
}

export default BooksApp

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
         setBooks(books);
         console.log("In App.js, after getBooks", books);
       })
   }

   // This function is called when moving books around the shelves rather than re-querying the API
   // after the call to update the individual book listing.
   const updateLocalShelves = (id, newShelf) => {
     console.log("Books before attempt to deconstruct", books)
     let updatedBooks = [...books]
     console.log("In updateLocalShelves, current value of books after array deconstruction", books)
     for (let book of updatedBooks) {
       console.log("In updateLocalShelves in App.js", book)
       if (book.id === id) {
         console.log(book['shelf'])
         book['shelf'] = newShelf;
         console.log(book['shelf'])
         setBooks(updatedBooks)
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

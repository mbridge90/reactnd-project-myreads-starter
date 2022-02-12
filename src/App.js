 import React from 'react'
import './App.css'
import ListBooks from "./ListBooks"
import SearchPage from "./SearchPage"
 import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';


 class BooksApp extends React.Component {

   render() {
    return (
      <Router>
        <Routes>
          <Route exact path='/' element={
            <ListBooks/>}
          />
          <Route path='/search' element={
            <SearchPage />}
          />
        </Routes>
      </Router>
    )
  }
}

export default BooksApp

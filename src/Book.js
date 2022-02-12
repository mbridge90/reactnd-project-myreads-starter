import React from 'react'
import './App.css'
import * as BooksAPI from "./BooksAPI";

class Book extends React.Component {
  state = {
    currentShelf: this.props.shelf ? this.props.shelf : "none"
  }

  handleUpdate = (e) => {
    const { updateLocalShelves, id } = this.props

    this.setState({
      currentShelf: e.target.value
    }, () => {
      // updateLocalShelves only passed as prop to <Book /> when <BookGrid /> has been rendered by <Bookshelf />.
      updateLocalShelves && updateLocalShelves(id, this.state.currentShelf);
      this.updateBook(id, this.state.currentShelf);
    });
  }

  updateBook (id, newShelf) {
    BooksAPI.update(id, newShelf)
        .then(() => console.log("Updated successfully in database"),
       () => console.log("Update in database failed"))
  }

  render () {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${this.props.cover})`
          }
          }/>
          <div className="book-shelf-changer">
            <select onChange={this.handleUpdate.bind(this)} value={this.state.currentShelf}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.author}</div>
      </div>
    )
  }
}

export default Book;

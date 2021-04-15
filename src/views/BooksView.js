import React, { Component } from "react";
import { BookShelf } from "../components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class BooksView extends Component {
  render() {
    const { books } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {books.length === 0 ? (
            <h1>Loading Books...</h1>
          ) : (
            <div>
              <BookShelf
                title="Currently Reading"
                value='currentlyReading'
                books={books.filter(
                  (book) => book.shelf === "currentlyReading"
                )}
              />
              <BookShelf
                title="Want to Read"
                value='wantToRead'
                books={books.filter((book) => book.shelf === "wantToRead")}
              />
              <BookShelf
                title="Read"
                value='read'
                books={books.filter((book) => book.shelf === "read")}
              />
            </div>
          )}
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

BooksView.propTypes = {
  books: PropTypes.array.isRequired,
};
export default BooksView;

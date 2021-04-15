import React from "react";
import { BookShelf } from "../components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// import Loader from "react-loader-spinner";

const BooksView = (props) => {
  const { books, onShelfChange } = props;
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
              value="currentlyReading"
              books={books.filter((book) => book.shelf === "currentlyReading")}
              onShelfChange={onShelfChange}
            />
            <BookShelf
              title="Want to Read"
              value="wantToRead"
              books={books.filter((book) => book.shelf === "wantToRead")}
              onShelfChange={onShelfChange}
            />
            <BookShelf
              title="Read"
              value="read"
              books={books.filter((book) => book.shelf === "read")}
              onShelfChange={onShelfChange}
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
};

BooksView.propTypes = {
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};
export default BooksView;

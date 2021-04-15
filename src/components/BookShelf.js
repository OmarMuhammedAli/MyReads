import React from "react";
import Book from './Book'
import PropTypes from 'prop-types'

const BookShelf = ({title, books, value}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}><Book shelfValue={value} book={book}/></li>
          ))}
        </ol>
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
}
export default BookShelf;

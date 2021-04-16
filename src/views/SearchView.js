import React, { Component } from "react";
import { Link } from "react-router-dom";
import BooksAPI from "../api";
import { Book } from "../components";

class SearchView extends Component {
  state = {
    searchResults: [],
    resultsExist: true,
  };

  handleSearch = (e) => {
    const searchTerm = e.target.value.trim();
    BooksAPI.search(searchTerm).then((r) => {
      if (!r) r = [];
      if ("error" in r) {
        this.setState({
          resultsExist: false,
        });
      } else {
        this.setState(() => ({
          searchResults: r.map((result) => {
            if (!("shelf" in result)) {
              result.shelf = "none";
            }
            if (this.props.books.some((book) => book.id === result.id)) {
              const existingBook = this.props.books.filter(
                (book) => book.id === result.id
              );
              result.shelf = existingBook[0].shelf;
            }
            return result;
          }),
          resultsExist: true,
        }));
      }
    });
  };
  render() {
    const { searchResults, resultsExist } = this.state;
    const { onShelfChange } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          {resultsExist ? (
            <ol className="books-grid">
              {searchResults &&
                searchResults.length > 0 &&
                searchResults.map((result) => (
                  <li key={result.id}>
                    <Book
                      book={result}
                      onShelfChange={onShelfChange}
                      shelfValue={result.shelf}
                    />
                  </li>
                ))}
            </ol>
          ) : (
            <h1>No Results Found!</h1>
          )}
        </div>
      </div>
    );
  }
}
export default SearchView;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import BooksAPI from "../api";
import { Book } from "../components";

class SearchView extends Component {
  state = {
    searchResults: [],
  };

  handleSearch = (e) => {
    const searchTerm = e.target.value.trim();
    BooksAPI.search(searchTerm).then((r) => {
      if (!r) r = [];
      if ("error" in r) {
        alert("No results found!");
      } else {
        this.setState(() => ({
          searchResults: r.map((result) => {
            if (!("shelf" in result)) {
              result.shelf = "none";
              // console.log("shelf doesn't exist");
            }
            if (this.props.books.some((book) => book.id === result.id)) {
              const existingBook = this.props.books.filter(
                (book) => book.id === result.id
              );
              result.shelf = existingBook[0].shelf;
              // console.log(existingBook);
            }
            return result;
          }),
        }));
        console.log(this.state.searchResults)
      }

      console.log(r);
    });
  };
  render() {
    const { searchResults } = this.state;
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
        </div>
      </div>
    );
  }
}
export default SearchView;

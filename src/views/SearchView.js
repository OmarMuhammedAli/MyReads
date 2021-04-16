import React, { Component } from "react";
import { Link } from "react-router-dom";
import BooksAPI from "../api";
import { Book } from "../components";

const SEARCH_TERMS = [
  "Android",
  "Art",
  "Artificial Intelligence",
  "Astronomy",
  "Austen",
  "Baseball",
  "Basketball",
  "Bhagat",
  "Biography",
  "Brief",
  "Business",
  "Camus",
  "Cervantes",
  "Christie",
  "Classics",
  "Comics",
  "Cook",
  "Cricket",
  "Cycling",
  "Desai",
  "Design",
  "Development",
  "Digital Marketing",
  "Drama",
  "Drawing",
  "Dumas",
  "Education",
  "Everything",
  "Fantasy",
  "Film",
  "Finance",
  "First",
  "Fitness",
  "Football",
  "Future",
  "Games",
  "Gandhi",
  "Homer",
  "Horror",
  "Hugo",
  "Ibsen",
  "Journey",
  "Kafka",
  "King",
  "Lahiri",
  "Larsson",
  "Learn",
  "Literary Fiction",
  "Make",
  "Manage",
  "Marquez",
  "Money",
  "Mystery",
  "Negotiate",
  "Painting",
  "Philosophy",
  "Photography",
  "Poetry",
  "Production",
  "Programming",
  "React",
  "Redux",
  "River",
  "Robotics",
  "Rowling",
  "Satire",
  "Science Fiction",
  "Shakespeare",
  "Singh",
  "Swimming",
  "Tale",
  "Thrun",
  "Time",
  "Tolstoy",
  "Travel",
  "Ultimate",
  "Virtual Reality",
  "Web Development",
  "iOS",
];

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
            <div>
              <h1>No Results Found!</h1>
              <h3>
                Can't find what you're looking for? Try using the following
                search terms:
              </h3>
              <p>{SEARCH_TERMS.join(" - ")}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default SearchView;

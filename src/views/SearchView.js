import React, { Component } from "react";
import { Link } from "react-router-dom";
import BooksAPI from '../api'
import {Book} from '../components'

class SearchView extends Component {
  state = {
    searchResults: []
  }

  handleSearch = (e) => {
    const searchTerm = e.target.value.trim()
    BooksAPI.search(searchTerm)
    .then(r => {
      this.setState({
        searchResults: r && r.length > 0? r: []
      })
    })
  } 
  render() {
    const {searchResults} = this.state
    const {onShelfChange} = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.handleSearch}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid" >
            {searchResults.map(result => (
              <li key={result.id}><Book book={result} onShelfChange={onShelfChange}/></li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchView;

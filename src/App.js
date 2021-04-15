import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import BooksAPI from "./api";
import { BooksView, SearchView, PageNotFound } from "./views";
import "./App.css";


class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }
  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const {books} = this.state
      book.shelf = shelf
      this.setState({
        books: [...books.filter(bk => bk.id !== book.id), book]
      })
    })
    .catch(e => console.error(e));
  };
  async componentDidMount() {
    const books = await BooksAPI.getAll().catch((e) => console.error(e));
    this.setState({
      books,
    });
    console.log(this.state.books);
  }
  render() {
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BooksView
                books={this.state.books}
                onShelfChange={this.handleShelfChange}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={() => <SearchView books={this.state.books} />}
          />
          <Route exact path="/404" component={PageNotFound} />
          <Redirect to="/404" />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;

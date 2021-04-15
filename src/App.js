import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import BooksAPI from './api'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { 
  BooksView,
  SearchView,
  PageNotFound
 } from './views'
 
class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }
  async componentDidMount() {
    const books = await BooksAPI.getAll()
    this.setState({
      books
    })
    console.log(this.state.books)
  }
  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() => <BooksView books={this.state.books}/>}/>
          <Route exact path='/search' render={() => <SearchView books={this.state.books}/>}/>
          <Route exact path='/404' component={PageNotFound}/>
          <Redirect to='/404'/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp

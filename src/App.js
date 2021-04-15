import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { 
  BooksView,
  SearchView,
  PageNotFound
 } from './views'
 


class BooksApp extends React.Component {
  state = {
    
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path='/' render={() => <BooksView/>}/>
          <Route exact path='/search' render={() => <SearchView/>}/>
          <Route exact path='/404' component={PageNotFound}/>
          <Redirect to='/404'/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp

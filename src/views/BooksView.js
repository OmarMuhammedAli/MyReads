import React, {Component} from 'react'
import {BookShelf} from '../components'

class BooksView extends Component {
    render() {
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf/>
                <BookShelf/>
                <BookShelf/>
              </div>
            </div>
            <div className="open-search">
              <button>Add a book</button>
            </div>
          </div>
        )
    }
}

export default BooksView
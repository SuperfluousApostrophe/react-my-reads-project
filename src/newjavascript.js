import React from 'react';
import { Route, Link } from 'react-router-dom';
import Bookshelf from './Bookshelf.js';
import SearchForm from './SearchForm.js';
import * as BooksAPI from './BooksAPI';
import './App.css';


class BooksApp extends React.Component {
   state = {
      books:[]
   };
   //This could be further abstracted if list of shelves/shelf metadata could be pulled from DB
   shelfNames = ["currentlyReading", "wantToRead", "read"];
   
   retrieveBooks = function(){
      BooksAPI.getAll()
         .then(books => {
            this.setState( {books:books} );
            console.log(this.state.books);
         })
         .catch(err=>console.log(err));
   };
   componentDidMount(){
      this.retrieveBooks();
   };
   
  render() {
    return (
      <div className="app">
         <Route path='/search' render={ ()=>(
            <SearchForm/>
          )} />       
         <Route exact path='/' render={ ()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                  {
//                     this.state.books.length >0 && (
//                        this.shelfNames.map((name, i) => (
//                           <Bookshelf key={i} bookList={this.state.books} shelfName={name}/>
//                        ))
//                     )
                  }
               <Bookshelf bookList={this.state.books} shelfName="currentlyReading"/>
                <Bookshelf bookList={this.state.books} shelfName="wantToRead"/>
                <Bookshelf bookList={this.state.books} shelfName="read"/>
              </div>
            </div>
            <div className="open-search">
               <Link to='/search'>Add A Book</Link>
            </div>
          </div>
        )} /> 
      </div>
    );
  };
};

export default BooksApp;

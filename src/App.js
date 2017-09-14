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
   shelves = new Map([
      ['currentlyReading',{title:'Currently Reading'}],
      ['wantToRead',{title:'Want To Read'}],
      ['read',{title:'Read'}]
   ]);
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
   buildBookCase = function(){
      let bookcase = [];
      for(let [key, value] of this.shelves){
         bookcase.push(<Bookshelf 
            key={key} 
            shelfDetails={value} 
            bookList={this.state.books} 
            shelfName={key}/>);
      }
      return bookcase;
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
                  { this.state.books.length >0 && (this.buildBookCase()) }
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

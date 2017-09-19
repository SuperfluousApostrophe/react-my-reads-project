import React from 'react';
import { Route, Link } from 'react-router-dom';
import Bookshelf from './Bookshelf.js';
import SearchForm from './SearchForm.js';
import * as BooksAPI from './BooksAPI';
import './App.css';


class BooksApp extends React.Component {
   constructor(props){
      super(props);
      
      this.updateBookshelfLocation = this.updateBookshelfLocation.bind(this);
   }
   state = {
      books:[]
   };
   //This could be further abstracted if list of shelves/shelf metadata could be pulled from DB
   shelves = new Map([
      ['currentlyReading',{title:'Currently Reading'}],
      ['wantToRead',{title:'Want To Read'}],
      ['read',{title:'Read'}]
   ]);
   //TODO: Refactor this method to convert the results into a 
   //map for easier processing later on
   retrieveBooks = function(){
      BooksAPI.getAll()
         .then(books => {
            this.setState( {books:books} );
         }).catch(err=>console.log(err));
   };
   componentDidMount(){
      this.retrieveBooks();
   };
   
   //TODO: refactor this method to affect a map directly
   updateBookshelfLocation(evt, book){
      let newShelf = evt.target.value;
//      console.log(`Moving ${book.title} to ${newShelf}`);

//      let currBook = this.state.books.filter((tmpBook, i) => tmpBook.id === book.id);
//      if(currBook.length>0){
//         currBook[0].shelf = newShelf;
//         BooksAPI.update({id:book.id}, newShelf).then(
//            data=>{
////                     console.log(data);
//         });
//      }
      let updatedBookList = this.state.books.map(
         (currBook) => {
            if(currBook.id === book.id){
               currBook.shelf = newShelf;
               BooksAPI.update({id:book.id}, newShelf).then(
                  data=>{
//                     console.log(data);
               });
            }
            return currBook;
         }
      );
//      console.log("updated Booklist", updatedBookList);
      this.setState( { books:updatedBookList } );
//      console.log("First book:",this.state.books[0]);
   };
   buildBookCase = function(){
      let bookcase = [];
      for(let [key, value] of this.shelves){
         bookcase.push(<Bookshelf 
            key={key} 
            shelfDetails={value} 
            bookList={this.state.books} 
            shelfName={key} 
            updateShelf={this.updateBookshelfLocation}
                    
         />);
      }
      return bookcase;
   };
   
  render() {
    return (
      <div className="app">
         <Route path='/search' render={ ()=>(
            <SearchForm state={this.state} updateShelf={this.updateBookshelfLocation} />
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

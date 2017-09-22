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
   /*
    * Call BooksAPI to get all saved books 
    */
   retrieveBooks = function(){
      BooksAPI.getAll()
         .then(books => {
            this.setState( {books:this.mapBooks(books)} );
         }).catch(err=>console.log(err));
   };
   /*
    * Turn the response array into a map for super easy updating
    */
   mapBooks = function(rawBookList){
      let bookMap = new Map();
      for(let i=0;i<rawBookList.length;i++){
        let book = rawBookList[i];
         bookMap.set(book.id, book);
      }
      return bookMap;
   };
   /*
    * Once the component is mounted, grab our books.
    */
   componentDidMount(){
      this.retrieveBooks();
   };
   
   /*
    * Changes the shelf property of the passed book 
    * Obj & updates the new bookshelf on the server
    */
   updateBookshelfLocation(evt, book){
      let newShelf = evt.target.value;
      let bookList = this.state.books;
      book.shelf = newShelf;
      bookList.set(book.id, book);
       this.setState( { books:bookList } );
       BooksAPI.update({id:book.id}, newShelf).then(
         data=>{
            //TODO: add success/fail message
         });
   };
   /*
    * Constructs the bookshelf components for each type of bookshelf 
    */
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
            <SearchForm globalState={this.state} updateShelf={this.updateBookshelfLocation} />
          )} />       
         <Route exact path='/' render={ ()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
               <div>
                  { this.state.books.size >0 && (this.buildBookCase()) }
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
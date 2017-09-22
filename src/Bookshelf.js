import React, {Component} from 'react';
import Book from './Book.js';

class Bookshelf extends Component{
   render(){
      const {shelfName, bookList, shelfDetails, updateShelf} = this.props;
      let shelf = shelfDetails;//this.shelves.get(shelfName);
      let booksOnShelf = [];
      //Make sure the books are on the correct shelf for the rendering section
      if(bookList){
         for(let[key, value] of bookList){
            if(value.shelf === shelfName){
               booksOnShelf.push(value);
            }
         }
      }
      return(
         <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
               <ol className="books-grid">
                  { booksOnShelf.map(book => (
                     <li key={book.id}><Book bookList={bookList} bookObj={book} updateShelf={updateShelf}/></li>    
                  ))}
              </ol>
            </div>
          </div>
      );
   };
};
export default Bookshelf; 
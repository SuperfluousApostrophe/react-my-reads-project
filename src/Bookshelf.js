import React, {Component} from 'react';
import Book from './Book.js';

class Bookshelf extends Component{
   render(){
      const {shelfName, bookList, shelfDetails, updateShelf} = this.props;
      let shelf = shelfDetails;//this.shelves.get(shelfName);
      let booksOnShelf = [];
      if(bookList){
         console.log(bookList);
         booksOnShelf = bookList.filter(book => book.shelf === shelfName);
      }
      return(
         <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
               <ol className="books-grid">
                  { booksOnShelf.map(book => (
                     <li key={book.id}><Book bookObj={book} updateShelf={updateShelf}/></li>    
                  ))}
              </ol>
            </div>
          </div>
      );
   };
   
};
export default Bookshelf; 
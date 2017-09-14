import React, {Component} from 'react';
import Book from './Book.js';

class Bookshelf extends Component{
   shelves = new Map([
      ['currentlyReading',{title:'Currently Reading'}],
      ['wantToRead',{title:'Want To Read'}],
      ['read',{title:'Read'}]
   ]);
   render(){
      const {shelfName, bookList} = this.props;
      let shelf = this.shelves.get(shelfName);
      console.log(shelf);
      let booksOnShelf = [];
//      let booksToShow = 10;
      
//      let Booklist = [];
//      for(let i=0;i<booksToShow;i++){
//        Booklist.push(<li key={i}><Book bookObj=""/></li>);
//      }
     
//         console.log(bookList);
      if(bookList){
         booksOnShelf = bookList.filter(book => book.shelf === shelfName);
         console.log(booksOnShelf);
      }
      
      
      return(
         <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
               <ol className="books-grid">
                  { booksOnShelf.map(book => (
                     <li key={book.id}><Book bookObj={book}/></li>    
                  ))}
              </ol>
            </div>
          </div>
      );
   };
   
};
export default Bookshelf; 
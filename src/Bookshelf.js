import React, {Component} from 'react';
import Book from './Book.js';

class Bookshelf extends Component{
   shelves = new Map([
      ['currReading',{title:'Currently Reading'}],
      ['wantRead',{title:'Want To Read'}],
      ['read',{title:'Read'}]
   ]);
   render(){
      const {shelfName} = this.props;
      let shelf = this.shelves.get(shelfName);
      let booksToShow = 10;
      
      let Booklist = [];
      for(let i=0;i<booksToShow;i++){
        Booklist.push(<li key={i}><Book bookObj=""/></li>);
      }
      
      
      return(
         <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.title}</h2>
            <div className="bookshelf-books">
               <ol className="books-grid">
                  {Booklist}
              </ol>
            </div>
          </div>
      );
   };
   
};
export default Bookshelf; 
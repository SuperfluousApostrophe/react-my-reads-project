import React, {Component} from 'react';
import Book from './Book.js';

class SearchResultDisplay extends Component{
   
   render(){
      const {searchResults, updateShelf} = this.props; 
      
      return(
         <div className="search-books-results">
            <ol className="books-grid">
                  { searchResults.map(book => (
                     <li key={book.id}><Book bookObj={book} updateShelf={updateShelf}/></li>    
                  ))}
            </ol>
         </div>
      );
   };
};
export default SearchResultDisplay;

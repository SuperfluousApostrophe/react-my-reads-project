import React, {Component} from 'react';
import Book from './Book.js';

class SearchResultDisplay extends Component{
   
   render(){
      const {searchResults} = this.props; 
      
      return(
         <div className="search-books-results">
            <ol className="books-grid">
               <li><Book/></li>
            </ol>
         </div>
      );
   };
};
export default SearchResultDisplay;

import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';

class BookActions extends Component{
   render(){
      const {bookObj, updateShelf} = this.props;
      let tmpBookObj = bookObj;
      if(tmpBookObj.shelf === undefined){
         tmpBookObj.shelf = 'none';
      }
      
      return(
         <div className="book-shelf-changer">
            <select onChange={(event)=>updateShelf(event, bookObj)} value={tmpBookObj.shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
      );
  };
};
export default BookActions;
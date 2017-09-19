import React, {Component} from 'react';
import BookActions from './BookActions.js';
class Book extends Component{
   
   render(){
      const {bookObj, updateShelf} = this.props;
      const thumbnail = bookObj.imageLinks.smallThumbnail;
      const authors = bookObj.authors.length >1 ? bookObj.authors.join(', ') : bookObj.authors[0];
      const title = bookObj.title;
      
      console.log(bookObj);
      
      return(
         <div className="book">
            <div className="book-top">
               <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("'+ thumbnail +'")' 
               }}></div>
               <BookActions bookObj={ bookObj } updateShelf={ updateShelf  } />
            </div>
            <div className="book-title">{ title }</div>
            <div className="book-authors">{ authors }</div>
          </div>
      );
   };
};
export default Book;
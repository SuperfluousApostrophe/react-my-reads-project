import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchResultDisplay from './SearchResultDisplay';

class SearchForm extends Component{
   state = {
      searchResults: []
   }
   errorMsg = null; 
   resultsToReturn=20;
   searchQuery = (queryString) => {
      console.log(queryString);
      if(queryString.trim().length>=3){//Let's save a little bandwidth
         BooksAPI.search(queryString.trim(), this.resultsToReturn).then(data=>{
            if(!data.error){
               this.setState({searchResults:data});
               this.errorMsg = null;
            } else { 
               this.errorMsg = "No Books Found";
            }
         });
      }
   }
   render(){
     const {globalState, updateShelf} = this.props; 
      return(
         <div className="search-books">
            <div className="search-books-bar">
               <Link className="close-search" to='/'>Close</Link>   
               <div className="search-books-input-wrapper">
                <input type="text" 
                  placeholder="Search by title or author" 
                  onChange={(event) => this.searchQuery(event.target.value)}/>
              </div>
            </div>
            <SearchResultDisplay globalState={globalState} updateShelf={updateShelf} searchResults={this.state.searchResults}/>
          </div>
      );
   };
};
export default SearchForm;
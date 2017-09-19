import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchResultDisplay from './SearchResultDisplay';

class SearchForm extends Component{
   state = {
      query: '',
      searchResults: []
   }
   errorMsg = null; 
   resultsToReturn=20;
   searchQuery = (queryString) => {
      console.log(queryString);
      if(queryString.trim().length>=3){
         BooksAPI.search(queryString.trim(), this.resultsToReturn).then(data=>{
            console.log(data);
            if(!data.error){
               this.setState({searchResults:data});
               this.errorMsg = null;
            } else { 
               this.errorMsg = "No Books Found";
            }
            console.log(this.state.searchResults);
         });
      }
   }
   //state.query should be updated with the last queried item
   render(){
     const {parentState, updateShelf} = this.props; 
      return(
         <div className="search-books">
            <div className="search-books-bar">
               <Link className="close-search" to='/'>Close</Link>   
               <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" 
                  placeholder="Search by title or author" 
                  onChange={(event) => this.searchQuery(event.target.value)}/>
              </div>
            </div>
            <SearchResultDisplay updateShelf={updateShelf} searchResults={this.state.searchResults}/>
          </div>
      );
   };
};
export default SearchForm;
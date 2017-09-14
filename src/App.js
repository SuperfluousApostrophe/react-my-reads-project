import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom';
import Bookshelf from './Bookshelf.js';
import SearchForm from './SearchForm.js';
import './App.css';


class BooksApp extends React.Component {
  state = {

   };

  render() {
    return (
      <div className="app">
         <Route path='/search' render={ ()=>(
            <SearchForm/>
          )} />       
         <Route exact path='/' render={ ()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf shelfName="currReading"/>
                <Bookshelf shelfName="wantRead"/>
                <Bookshelf shelfName="read"/>
              </div>
            </div>
            <div className="open-search">
               <Link to='/search'>Add A Book</Link>
            </div>
          </div>
        )} /> 
      </div>
    );
  };
};

export default BooksApp;

import React, {Component} from 'react';

class BookActions extends Component{
      options = new Map([
         ["moveTo",{
            isDisabled:true,
            displayValue:'Move to...'
         }],
         ["currentlyReading",{
               isDisabled:false,
               displayValue:'Currently Reading'
            }],
         ["wantToRead",{
               isDisabled:false,
               displayValue:'Want to Read'
            }],
         ["read",{
               isDisabled:false,
               displayValue:'Read'
            }],
         ["none",{
               isDisabled:false,
               displayValue:'None'
            }],
      ]);
      buildOptions = function(){
         let optionsElements = [];
         for(let [key, value] of this.options){
            optionsElements.push(<option 
              key={key} 
               value={key} 
              disabled={value.isDisabled} 
              >{value.displayValue}</option>);
         }
      return optionsElements;
   };
   
   render(){
      const {bookObj, updateShelf} = this.props;
      let tmpBookObj = bookObj;
      if(tmpBookObj.shelf === undefined){
         tmpBookObj.shelf = 'none';
      }
      return(
         <div className="book-shelf-changer">
            <select onChange={(event)=>updateShelf(event, bookObj)} value={tmpBookObj.shelf}>
            {
              this.buildOptions()
            }  
            </select>
          </div>
      );
  };
};
export default BookActions;
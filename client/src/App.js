import React, { Component } from 'react';
import './App.css';
import Header from './Component/shared/header';
import RentalList from './Component/rental/rentalList'
import RentailDetail from './Component/rental/rentalDetail'

class App extends Component {


  state = {
    isRentalList :true
  }

 navigate = () => {
   this.setState ({ 
     isRentalList:!this.state.isRentalList
   })
  }


  render() {
    return (
      <div className="App">
      <Header/>
      <button onClick={this.navigate}>navigate</button>
       <div className ="container">
       {this.state.isRentalList ? <RentalList/> :<RentailDetail/>}
       </div>
      </div>
    );
  }
}

export default App;

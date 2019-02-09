import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './App.css';
import Header from './Component/shared/header';
import RentalList from './Component/rental/rentalList'
import RentailDetail from './Component/rental/rentalDetail'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
      <div className="App">
      <Header/>
     
       <div className ="container">
       <Route exact path="/" render={() => {return <Redirect to="/rentals"/>}}/>
       <Route exact path="/rentals" component={RentalList}/>
       <Route exact path="/rentals/:id" component={RentailDetail}/>
        
       </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

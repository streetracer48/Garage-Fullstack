import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'

import * as redux from 'redux';
import {Provider} from 'react-redux'
import './App.css';
import Header from './Component/shared/header';
import RentalList from './Component/rental/rentalList'
import RentailDetail from './Component/rental/rentalDetail'
import Register from './Component/register/index'
import Login from './Component/login/'

class App extends Component {

  render() {
    return (
 
      <div className="App">
      <Header/>
     
       <div className ="container">
       <Route exact path="/" render={() => <Redirect to="/rentals"/>}/>
       <Route exact path="/rentals" component={RentalList}/>
       <Route exact path="/rentals/:id" component={RentailDetail}/>
       <Route exact path="/register" component={Register}/>
       <Route exact path="/login" component={Login}/>
       </div>
      </div>

    );
  }
}

export default App;

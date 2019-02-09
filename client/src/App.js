import React, { Component } from 'react';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'

import * as redux from 'redux';
import {Provider} from 'react-redux'
import './App.css';
import Header from './Component/shared/header';
import RentalList from './Component/rental/rentalList'
import RentailDetail from './Component/rental/rentalDetail'

const store = require('./reducers').init();

class App extends Component {

  render() {
    return (
    <Provider store={store}>  
      <BrowserRouter>
      <div className="App">
      <Header/>
     
       <div className ="container">
       <Route exact path="/" render={() => <Redirect to="/rentals"/>}/>
       <Route exact path="/rentals" component={RentalList}/>
       <Route exact path="/rentals/:id" component={RentailDetail}/>
        
       </div>
      </div>
      </BrowserRouter>
    </Provider>  
    );
  }
}

export default App;

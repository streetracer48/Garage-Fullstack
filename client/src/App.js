import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import Header from './Component/shared/header';
import RentalList from './Component/rental/rentalList'
import RentailDetail from './Component/rental/rentalDetail'
import Register from './Component/register/index'
import Login from './Component/login/'
import * as actions from './actions'
import {Route, Redirect, withRouter} from 'react-router-dom'
class App extends Component {

  componentDidMount() {
    this.props.dispatch(actions.checkAuthState())
  }

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



export default withRouter(connect()(App));

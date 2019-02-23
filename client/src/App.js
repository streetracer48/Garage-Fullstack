import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import Header from './Component/shared/header';
import RentalListing from './Component/rental/rentalLising/rentalListing'
import RentalSearchListing from './Component/rental/rentalLising/rentalSearchLisiting'
import RentailDetail from './Component/rental/rentalDetail/rentalDetail'
import Register from './Component/register/index'
import Login from './Component/login/'
import {LoggedInRoute} from './Component/shared/auth/LoggedInRoute'
import {ProtectedRoute} from './Component/shared/auth/ProtectedRoute'
import * as actions from './actions'
import {Route, Redirect, withRouter, Switch} from 'react-router-dom'
class App extends Component {

  componentDidMount() {
    this.props.dispatch(actions.checkAuthState())
  }

  logout = () => {
    this.props.dispatch(actions.logout())
  }

  render() {
    return (
 
      <div className="App">
      <Header logout={this.logout}/>
     
       <div className ="container">
       <Switch>
       <Route exact path="/" render={() => <Redirect to="/rentals"/>}/>
       <Route exact path="/rentals" component={RentalListing}/>
       <Route exact path='/rentals/:city/homes' component={RentalSearchListing} />
       {/* <Route exact path="/rentals/:id" component={RentailDetail}/> */}

       {/* Testing purpose making */}
       <ProtectedRoute exact path="/rentals/:id" component={RentailDetail}/>
       
       <LoggedInRoute exact path='/register' component={Register} />
       <Route exact path="/login" component={Login}/>
       </Switch>
       </div>
      </div>

    );
  }
}



export default withRouter(connect()(App));

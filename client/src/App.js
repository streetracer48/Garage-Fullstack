import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import Header from './Component/shared/header';
import RentalListing from './Component/rental/rentalLising/rentalListing'
import RentalSearchListing from './Component/rental/rentalLising/rentalSearchLisiting'
import RentailDetail from './Component/rental/rentalDetail/rentalDetail'
import RentalCreate from './Component/rental/rentalCreate/rentalCreate'
import RentalManage from './Component/rental/rental-manage/RentalManage'
import RentalBooking from './Component/rental/booking/booking-manage/BookingManage'
import Register from './Component/register/index'
import Login from './Component/login/'
import {LoggedInRoute} from './Component/shared/auth/LoggedInRoute'
import {ProtectedRoute} from './Component/shared/auth/ProtectedRoute'
import { ToastContainer } from 'react-toastify';
import * as actions from './actions'
import {Route, Redirect, withRouter, Switch} from 'react-router-dom'
import { StripeProvider } from 'react-stripe-elements';
class App extends Component {

  componentDidMount() {
    this.props.dispatch(actions.checkAuthState())
  }

  logout = () => {
    this.props.dispatch(actions.logout())
  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_Je8SLAEZ2aNsaC9u3TDz9Ex600P6quFmG9">
      <div className="App">
       <ToastContainer/>
      <Header logout={this.logout}/>
     
       <div className ="container">
       <Switch>
       <Route exact path="/" render={() => <Redirect to="/rentals"/>}/>
       <Route exact path="/rentals" component={RentalListing}/>
       <Route exact path='/rentals/:city/homes' component={RentalSearchListing} />
       {/* <Route exact path="/rentals/:id" component={RentailDetail}/> */}

       {/* Testing purpose making */}
       <ProtectedRoute exact path="/rentals/manage" component={RentalManage}/>
       <ProtectedRoute exact path="/bookings/manage" component={RentalBooking}/>
       <ProtectedRoute exact path="/rentals/create" component={RentalCreate}/>
   
       <Route exact path="/rentals/:id" component={RentailDetail}/>
       
       
       <LoggedInRoute exact path='/register' component={Register} />
       <Route exact path="/login" component={Login}/>
       </Switch>
       </div>
      </div>
      </StripeProvider>
    );
  }
}



export default withRouter(connect()(App));

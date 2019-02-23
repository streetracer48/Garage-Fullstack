import React, { Component } from 'react';
import {connect} from 'react-redux'
import './App.css';
import Header from './Component/shared/header';
import RentalList from './Component/rental/rentalLising/rentalList'
import RentailDetail from './Component/rental/rentalDetail/rentalDetail'
import Register from './Component/register/index'
import Login from './Component/login/'
import {LoggedInRoute} from './Component/shared/auth/LoggedInRoute'
import {ProtectedRoute} from './Component/shared/auth/ProtectedRoute'
import * as actions from './actions'
import {Route, Redirect, withRouter} from 'react-router-dom'
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
       <Route exact path="/" render={() => <Redirect to="/rentals"/>}/>
       <Route exact path="/rentals" component={RentalList}/>
       {/* <Route exact path="/rentals/:id" component={RentailDetail}/> */}

       {/* Testing purpose making */}
       <ProtectedRoute exact path="/rentals/:id" component={RentailDetail}/>
       
       <LoggedInRoute exact path='/register' component={Register} />
       <Route exact path="/login" component={Login}/>
       </div>
      </div>

    );
  }
}



export default withRouter(connect()(App));

import React,{Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import RentalSearchInput from '../rental/searchInput/searchInput'
class  Header extends Component {

  handleLogout = () => {
    // console.log(this.props)
    this.props.logout();
    this.props.history.push('/login');
  }

   renderDropdownOwner = (isAuth) => {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <a className="nav-link nav-item dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Owner Section
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link className="dropdown-item" to="/rentals/create">Create Rental</Link>
            <Link className="dropdown-item" to="/rentals/manage">Manage Rentals</Link>
            <Link className="dropdown-item" to="/bookings/manage">Manage Bookings</Link>
          </div>
        </div>
      )
    }
  }


  renderAuthButtons(isAuth, username) {
    if (isAuth) {
      return (
        <React.Fragment>
        <a className="nav-item nav-link" href="#">Welcome {username}</a>
        <a className='nav-item nav-link clickable' onClick={this.handleLogout}>Logout</a>
        </React.Fragment>
      )
     
    }

    return (
        <React.Fragment>
          <Link className='nav-item nav-link' to='/login'>Login <span className='sr-only'>(current)</span></Link>
          <Link className='nav-item nav-link' to='/register'>Register</Link>
        </React.Fragment>
      )
  }


  render () {

    const {isAuth, username} = this.props.auth;


    return (
      <nav className='navbar navbar-dark navbar-expand-lg'>
      <div className='container'>
        <Link className='navbar-brand' to="/">BookWithMe</Link>

        <RentalSearchInput/>
        
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav ml-auto'>
          {this.renderDropdownOwner(isAuth)}
          {this.renderAuthButtons(isAuth, username)}
          </div>
        </div>
      </div>
    </nav>
    
    )

  }
 
}

const mapStateToProps = (state) => {
   
  return {
     auth:state.auth
   }
}

export default withRouter(connect(mapStateToProps)(Header));

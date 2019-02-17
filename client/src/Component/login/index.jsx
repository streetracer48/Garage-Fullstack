import React, {Component} from 'react'
import LoginForm from './loginForm'
import {connect} from 'react-redux'
import * as action from '../../actions'

class Login extends Component {


    loginUser = (loginData) => {
     this.props.dispatch(action.login(loginData))

    }


       render () {
        //    console.log(this.props.location.state);
         const {successRegister}  = this.props.location.state || false
            return ( 
                <section id="login">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Login</h1>
              {
                successRegister &&
                  <div className='alert alert-success'>
                    <p> You have been succesfuly registered, please login now. </p>
                  </div>
              }
              <LoginForm submitCb={this.loginUser}/>
            </div>
            <div className="col-md-6 ml-auto">
              <div className="image-container">
                <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
                <img src={process.env.PUBLIC_URL + '/img/login-image.jpg'} alt=""/>
              </div>
            </div>
          </div>
        </div>
      </section>
            )
        }
 }
 const mapStateToProps =(state) => {

    return {
        auth:state.auth
     }
 }

 export default connect(mapStateToProps)(Login) 
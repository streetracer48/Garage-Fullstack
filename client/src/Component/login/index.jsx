import React, {Component} from 'react'
import LoginForm from './loginForm'


class Login extends Component {


    loginUser = (loginData) => {
        console.log(loginData)

    }


       render () {
            return ( 
                <section id="login">
        <div className="bwm-form">
          <div className="row">
            <div className="col-md-5">
              <h1>Login</h1>
              {/* {
                successRegister &&
                  <div className='alert alert-success'>
                    <p> You have been succesfuly registered, please login now. </p>
                  </div>
              } */}
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

 export default Login
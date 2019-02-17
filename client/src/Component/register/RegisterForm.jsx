import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {InputField} from '../../utils/form/InputFiled'

const RegisterForm = ( {handleSubmit, pristine, submitting, submitCb, valid, errors }) => {

     return ( 
        <form onSubmit={handleSubmit(submitCb)}>
        <Field
          name="username"
          type="text"
          label='Username'
          className='form-control'
          component={InputField}
        />
        <Field
          name="email"
          type="email"
          label='Email'
          className='form-control'
          component={InputField}
        />
        <Field
          name="password"
          type="password"
          label='Password'
          className='form-control'
          component={InputField}
        />
        <Field
          name="passwordConfirmation"
          type="password"
          label='Password Confirmation'
          className='form-control'
          component={InputField}
        />
        <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
          Register
        </button>
        {/* <BwmResError errors={errors} /> */}
      </form>
     )

 }

 const validate = values => {
    const errors = {};
  
    if (!values.username) {
      errors.username = 'Please enter Username!';
    }
    if (values.username && values.username.length < 4) {
      errors.username = 'Username min length is 4 characters!';
    }
  
    if (!values.email) {
      errors.email = 'Please enter email!';
    }
  
    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = 'Please enter password confirmation!';
    }
  
    if (values.password !== values.passwordConfirmation) {
      errors.password = 'Passwords must be the same';
    }
  
    return errors;
  }

 export default reduxForm({
    form: 'registerForm',
    validate
  })(RegisterForm)
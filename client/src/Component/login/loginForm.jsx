import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {InputField} from '../../utils/form/InputFiled'
import {ResError} from '../../utils/ResErrors/ResErrors'

const LoginForm = ({handleSubmit, pristine, submitting, submitCb, valid, errors }) => {

     return (
        <form onSubmit={handleSubmit(submitCb)}>
        <Field
          name="email"
          type="email"
          label='Enter your email'
          className='form-control'
          component={InputField}
        />
        <Field
          name="password"
          type="password"
          label='Enter your Password'
          className='form-control'
          component={InputField}
        />
      
        <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
          Login
        </button>
        <ResError errors={errors} />
      </form>
      )

 }

 
 const validate = values => {
    const errors = {};
  
    if (!values.email) {
      errors.email = 'Please enter email!';
    }
    if (!values.password) {
      errors.password = 'Please enter password!';
    }
  
    return errors;
  }

 export default reduxForm({
    form: 'loginForm',
    validate
  })(LoginForm)
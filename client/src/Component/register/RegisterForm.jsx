import React from 'react'
import { Field, reduxForm } from 'redux-form';
import {InputField} from '../../utils/form/InputFiled'
import {ResError} from '../../utils/ResErrors/ResErrors'
import { validatesReg } from '../../helpers/index'

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
        <ResError errors={errors} />
      </form>
     )

 }

 const validate = values =>  validatesReg(values)


 export default reduxForm({
    form: 'registerForm',
    validate
  })(RegisterForm)
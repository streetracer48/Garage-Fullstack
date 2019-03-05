import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {InputField} from '../../../utils/form/InputFiled'
import {TextArea} from '../../../utils/form/textArea'
import FileUpload  from '../../../utils/form/FileUpload'
import {SelectInput} from '../../../utils/form/selectInput'
// import {ResError} from '../../../utils/ResErrors/ResErrors'
import { validatesCrRental } from '../../../helpers/'

const RentalCreateForm = (props) => {
const {handleSubmit, submitCreateRental, options,errors} = props
    return (
        <form onSubmit={handleSubmit(submitCreateRental)}>
        <Field
        name="title"
        type="text"
        label="Title"
        className='form-control'
        component={InputField}
        />



       <Field
        name="description"
        type="text"
        label="Description"
        rows='6'
        className='form-control'
        component={TextArea}
        />

        <Field
        name="city"
        type="text"
        label="City"
        className='form-control'
        component={InputField}
        />
        
        <Field
        name="street"
        type="text"
        label="Street"
        className='form-control'
        component={InputField}
        />
        <Field
         name="category"
         options={options}
         label='Category'
         className='form-control'
         component={SelectInput}
        />
       

         <Field
          className="form-control"
          name="image"
          component={FileUpload}
          label="Image"
          />
         <Field
        name="bedrooms"
        type="number"
        label="Bedrooms"
        className='form-control'
        component={InputField}
        />
        <Field
        name="dailyRate"
        type="text"
        label="Daily Rate"
        className='form-control'
        component={InputField}
        />
         <Field
        name="shared"
        type="checkbox"
        label="Shared"
        className='form-control'
        component={InputField}
        />
        <button className='btn btn-bwm btn-form' type='submit'>Create Rental</button>
        {/* <ResError errors={errors} /> */}
        </form>
    )
       
}
const validate = values =>  validatesCrRental(values)


export default reduxForm({
  form:'rentalCreateForm',
  validate,
  initialValues:{shared:false, category:'apartment'}
}) (RentalCreateForm)
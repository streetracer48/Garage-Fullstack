import titleize from 'titleize';
import * as moment from 'moment';


export const rentalType = isShared => isShared ? 'shared' : 'entire'

export const toUpperCase = value => value ? titleize(value) : ''

export const getRangeOfDates =(startAt, endAt, dateFormat) => {

     let tempDates = [];

     let mEndAt = moment(endAt);
     let  mStartAt = moment(startAt);

     while(mStartAt<mEndAt){

        tempDates.push(mStartAt.format(dateFormat));
        mStartAt=mStartAt.add(1,'day');
     }

     tempDates.push(mEndAt.format(dateFormat));

     return tempDates;
}


export const validatesReg = values =>
 {
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


  export const validatesCrRental = values =>
 {
    const errors = {};
  
    if (!values.title) {
      errors.title = 'Please enter tittle!';
    }
    if (values.title && values.title.length < 4) {
      errors.title = 'title min length is 4 characters!';
    }
  
    if (!values.city) {
      errors.city = 'Please enter street!';
    }
  
    if (!values.street) {
      errors.street = 'Please enter street!';
    }

    
    if (!values.category) {
      errors.category = 'Please enter category!';
    }
    
    
  
    if (!values.bedrooms) {
      errors.bedrooms = 'please enter bedrooms !';
    }
    if(!values.dailyRate) {
       errors.dailyRate ='Please Enter daily rate' 
    }
  
    return errors;
  }


  export const isExpired = (date) => {
     const dateNow = moment();
     const dateM= moment(date);
     
     return dateM.isBefore(dateNow)
  }



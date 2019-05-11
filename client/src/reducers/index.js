import {rentalReducer,selectRentalReducer} from './rental-reducer.js'
import {authReducer} from './auth-reducer'
import {userbookingReducer} from './booking-reducer';
import {userRentalReducer} from './user-rental-reducer'
import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth:authReducer,
  rentals:rentalReducer,
  rental:selectRentalReducer,
  form: formReducer,
  booking:userbookingReducer,
  userRental:userRentalReducer
});

export default rootReducer
import {rentalReducer,selectRentalReducer} from './rental-reducer.js'
import {combineReducers} from 'redux'
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  rentals:rentalReducer,
  rental:selectRentalReducer,
  form: formReducer
});

export default rootReducer
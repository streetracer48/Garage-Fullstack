import {rentalReducer,selectRentalReducer} from './rental-reducer.js'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  rentals:rentalReducer,
  rental:selectRentalReducer
});

export default rootReducer
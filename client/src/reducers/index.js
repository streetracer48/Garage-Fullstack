import * as redux from 'redux';
import {rentalReducer,selectRentalReducer} from './rental-reducer.js'


 export const init = () => {
  const reducer = redux.combineReducers({
      rentals:rentalReducer,
      rental:selectRentalReducer
   })

     const store = redux.createStore(reducer);

     return store;
 }
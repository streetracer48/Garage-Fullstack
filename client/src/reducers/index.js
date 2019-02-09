import * as redux from 'redux';
import {rentalReducer,selectRentalReducer} from './rental-reducer.js'
import thunk from 'redux-thunk';
 export const init = () => {
  const reducer = redux.combineReducers({
      rentals:rentalReducer,
      rental:selectRentalReducer
   })

     const store = redux.createStore(reducer, redux.applyMiddleware(thunk));
     return store;
 }
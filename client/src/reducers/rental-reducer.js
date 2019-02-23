import {
    FETCH_RENTALS_INIT,
    FETCH_RENTALS_SUCCESS,
    FETCH_RENTALS_FAIL, 
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTAL_BY_ID_FAILS,
    FETCH_RENTAL_BY_ID_INIT,
} from '../actions/types'
const InitialState = {
    rentals:{
        data:[],
        errors:[]
    },
    rental:{
        data:{},
        isloading:true
    }
 }


export const rentalReducer = (state =InitialState.rentals, action) => {


    switch(action.type) {

        case 'FETCH_RENTALS_INIT':
        return {...state, data:[]}
        
        case 'FETCH_RENTALS_SUCCESS':
        return {...state, data:action.rentals}
        case 'FETCH_RENTALS_FAIL':
        return Object.assign({}, state, {errors: action.errors, data: []});
        
        default:
        return state;
    }
 }

 export const selectRentalReducer = (state = InitialState.rental, action) => {
    console.log('rental dispatch',action.rental);
      switch (action.type) {
        case 'FETCH_RENTAL_BY_ID_INIT':
        return {...state, data:{}, isloading:true}
          case 'FETCH_RENTAL_BY_ID_SUCCESS':
          return {...state, data:action.rental, isloading:false}
          default:
              return state;
      }
 }
import {
    FETCH_USER_RENTAL_INIT,
    FETCH_USER_RENTAL_SUCCESS,
    FETCH_USER_RENTAL_FAILURE
    
} from '../actions/types'

const INITAL_STATE = { 
   data:[],
   errors:[],
   isLoading:false
}

export const userRentalReducer = (state = INITAL_STATE, action) => {

   switch(action.type) {
       
       case FETCH_USER_RENTAL_INIT:
      
       return {...state, data:[], errors:[],isLoading:true };
       case FETCH_USER_RENTAL_SUCCESS:
        console.log('hit hereeeeeeeeeeeee man', action.userRental);
       return Object.assign({}, state, {data:action.userRental,  isLoading:false, errors: []});
       case FETCH_USER_RENTAL_FAILURE:
       return {...state, data:[], errors:action.errors};
       default:
       return state

   }

}
import {
     FETCH_USER_BOOKING_INIT,
    FETCH_USER_BOOKING_SUCCESS,
    FETCH_USER_BOOKING_FAILURE } from '../actions/types'

const INITAL_STATE = { 
    data:[],
    errors:[],
    isLoading:false
}

export const userbookingReducer = (state = INITAL_STATE, action) => {

    switch(action.type) {
        
        case FETCH_USER_BOOKING_INIT:
        // console.log('hit hereee man');
        return {...state, data:[], errors:[],isLoading:true };
        case FETCH_USER_BOOKING_SUCCESS:
        return Object.assign({}, state, {data:action.userbookings,  isLoading:false, errors: []});
        case FETCH_USER_BOOKING_FAILURE:
        return {...state, data:[], errors:action.errors};
        default:
        return state

    }

}
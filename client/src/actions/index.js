import axios from 'axios'

import  AuthService from '../Component/services/auth-service'
import  AxiosService from '../Component/services/axios-service'

import {FETCH_RENTALS_INIT,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_FAIL,
  FETCH_RENTAL_BY_ID_SUCCESS,
  FETCH_RENTAL_BY_ID_FAILS,
  FETCH_RENTAL_BY_ID_INIT,
  LOGIN_SUCCESS, 
  LOGIN_FAILURE,
  LOGOUT,
// CREATE_RENTAL_INIT,
// CREATE_RENTAL_SUCCESS,
// CREATE_RENTAL_FAILURE
} from './types'
  
const axiosInstance = AxiosService.getInstance();

const fetchRentalInit = () => {
   return {
      type:FETCH_RENTALS_INIT
   }
}
 const fetchRentalsSuccess = (rentals) => {
     return {
         type:FETCH_RENTALS_SUCCESS,
         rentals
      }
 }

  const fetchRentalsfail = (errors) => {
    console.log('errors search',errors);
  return {
      type:FETCH_RENTALS_FAIL,
      errors
   }
}

export const fetchRentals =(city) =>
{
  
  const url = city? `/rentals?city=${city}`:'/rentals';

  return dispatch => {
    dispatch(fetchRentalInit())
     axiosInstance.get(url).then(res => res.data)
                       .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
                       .catch(({response}) => dispatch(fetchRentalsfail(response.data.errors)))


      
  }

}

//FETCH RENTAL BY ID

const fetchRentalByIdInit = () => {
  return {
      type:FETCH_RENTAL_BY_ID_INIT
   }
}

const fetchRentalByIdSuccess = (rental) => {
  return {
      type:FETCH_RENTAL_BY_ID_SUCCESS,
      rental
   }
}

export const fetchRentalById =(id) =>
{
   
  return dispatch => {
    dispatch(fetchRentalByIdInit())
     axiosInstance.get(`/rentals/${id}`).then(rental => {
      //  console.log('actiondata',rentals.data.foundRental)
         dispatch(fetchRentalByIdSuccess(rental.data));
      })
      
  }


}
 


  


  //create Rental

  // const createRentalInit = () => {

  //   return {
  //      type:CREATE_RENTAL_INIT
  //    }

  //  }

  //  const createRentalSuccess = (rental) => {
  //    console.log('hit rental')

  //    return {
  //     type:CREATE_RENTAL_SUCCESS,
  //     rental
  //  }
      
  //   }

    // const createRentalFailure = (errors) => {
    //    return {
    //       type:CREATE_RENTAL_FAILURE,
    //       errors
    //     }
    //  }


     export const createRental = (rentalData) => {
      return axiosInstance.post('/rentals',{...rentalData}).then(
        (res) => {
          return res.data
         },
  
         (err) => {
         return Promise.reject(err.response.data.errors)
         }
      )
    }





  // Auth action 

  export const register = (userData) => {
    return axios.post('/api/v1/users/register',{...userData}).then(
      (res) => {
        return res.data
       },

       (err) => {
       return Promise.reject(err.response.data.errors)
       }
    )
  }

  const loginSuccess = () => {
    const username = AuthService.getUsername();
    console.log('username', username);
    return {
      type: LOGIN_SUCCESS,
      username
    }
   }

   const loginFailure = (errors) => {
     console.log('Login failed',errors)
    return {
      type: LOGIN_FAILURE,
      errors
    }
  }

  export const checkAuthState = () => {
    return dispatch => {
      if(AuthService.isAuthenticated()) {
        dispatch(loginSuccess())
      }
    } 
  }

  export const login =(userData) =>
  {
    return dispatch => {
      return axiosInstance.post('/users/auth', userData)
        .then(res => res.data)
        .then(token => {
          AuthService.saveToken(token)
          dispatch(loginSuccess());
        })
        .catch(({response}) => {
          dispatch(loginFailure(response.data.errors));
        })
    }

  }

  export const logout = () => {
    AuthService.invalidateUser();
  
    return {
      type: LOGOUT
    }
  }


  // // Create booking

  export const createBooking = (bookingData) => {
    return axiosInstance.post('/bookings', bookingData)
    .then(res => res.data)
    .catch(({response}) => Promise.reject(response.data.errors))    
  }
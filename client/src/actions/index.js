import axios from 'axios'
import {  toast } from 'react-toastify';
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
  FETCH_USER_BOOKING_INIT,
  FETCH_USER_BOOKING_FAILURE,
  FETCH_USER_BOOKING_SUCCESS,
  FETCH_USER_RENTAL_INIT,
  FETCH_USER_RENTAL_SUCCESS,
  FETCH_USER_RENTAL_FAILURE,
// CREATE_RENTAL_INIT,
// CREATE_RENTAL_SUCCESS,
// CREATE_RENTAL_FAILURE
UPDATE_RENTAL_SUCCESS,
UPDATE_RENTAL_FAIL,
RESET_RENTAL_ERRORS
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

export const createReview =(bookingId, reviewData) =>
{
   
  return dispatch => {
    // dispatch(fetchRentalByIdInit())
     axiosInstance.post(`/review?bookingId=${bookingId}`,{...reviewData}).then(review => {
      //  console.log('actiondata',rentals.data.foundRental)
         dispatch(Userbookings());
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


  export const resetRentalErrors = () => {
    return {
      type: RESET_RENTAL_ERRORS
    }
  }
  

  // // Create booking

  export const createBooking = (bookingData) => {
    return axiosInstance.post('/bookings', bookingData)
    .then(res => res.data)
    .catch(({response}) => Promise.reject(response.data.errors))    
  }


  ///Manage user Booking section


  const fetchUserBookingInit = () => {
      return {
        type:FETCH_USER_BOOKING_INIT
      }
   }

   const fetchUserBookingSuccess = (userbookings) => {

    return { 
      type:FETCH_USER_BOOKING_SUCCESS,
      userbookings
    }
      
    }

    const fetchUserbookingFail = (errors) => {
      return {
        type:FETCH_USER_BOOKING_FAILURE,
        errors

       }
     }


     
  export const Userbookings =() =>
  {
    

    return dispatch => {
      dispatch(fetchUserBookingInit())
      return axiosInstance.get('/bookings/manage')
        .then(res => res.data)
        .then(userbookings => {
          
          dispatch(fetchUserBookingSuccess(userbookings));
        })
        .catch(({response}) => {
          dispatch(fetchUserbookingFail(response.data.errors));
        })
    }

  }


  //USER OWNER RENTAL

  const fetchUserRentalInit = () => {
    return {
      type:FETCH_USER_RENTAL_INIT

    }
}

const fetchUserRentalSuccess = (userRental) => {
  return {
    type:FETCH_USER_RENTAL_SUCCESS,
    userRental
  }

}

const fetchUserRentalFail = (errors) => {
   return {
      type:FETCH_USER_RENTAL_FAILURE,
      errors
   }
}
  
export const UserRental =() =>
{

  return dispatch => {
    dispatch(fetchUserRentalInit())
    return axiosInstance.get('/rentals/manage')
      .then(res => res.data)
      .then(userRentals => {
        
        dispatch(fetchUserRentalSuccess(userRentals));
      })
      .catch(({response}) => {
        dispatch(fetchUserRentalFail(response.data.errors));
      })
  }

}


export const getUserRentalsPromise = () => {
  return axiosInstance.get('/rentals/manage').then(
    res => res.data,
    err => Promise.reject(err.response.data.errors)
  )
}

export const deleteRental = (rentalId) => {
  return axiosInstance.delete(`/rentals/${rentalId}`).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors))
}


//UPDATE RENTAL 

const updateRentalSuccess = (updatedRental) => {
  return {
    type: UPDATE_RENTAL_SUCCESS,
    rental: updatedRental
  }
}

const updateRentalFail = (errors) => {
  return {
    type: UPDATE_RENTAL_FAIL,
    errors
  }
}

export const updateRental = (id, rentalData) => dispatch => {
  return axiosInstance.patch(`/rentals/${id}`, rentalData)
    .then(res => res.data)
    .then(updatedRental => {
      dispatch(updateRentalSuccess(updatedRental));
      toast.success('succesfully updated your rental! Enjoy.');
    })
    .catch(({response}) => dispatch(updateRentalFail(response.data.errors)))
}


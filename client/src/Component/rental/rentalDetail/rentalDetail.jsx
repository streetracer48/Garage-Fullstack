import React, { Component } from 'react'
import {connect} from 'react-redux'
import {RentalDetailInfo} from './rentalDetailInfo'
import RentalMap from '../rentalMap/rentalMap'
import Booking from '../booking/booking'
import RentalUpdate from './rentalUpdate/index'
import StarRatings from 'react-star-ratings';
import * as actions from '../../../actions'



class RentalDetail extends Component { 

  state ={
    isUpdate:false
  }


    componentDidMount() {
      const rentalId = this.props.match.params.id;
       this.props.dispatch(actions.fetchRentalById(rentalId)) 
     }

     renderRentalInfo = (rental) => {
     const {isUpdate}= this.props.location.state || false;

     return isUpdate ? <RentalUpdate
      rental={rental}
      /> : <RentalDetailInfo rental={rental}/> 

     }



    render() {

        const rental = this.props.rental;
        const isloading = this.props.isloading;
        // console.log('rental data collects',this.props.rental)

        if(!isloading){

        
    return (
        <div className='container'>
     <section id='rentalDetails'>
  <div className='upper-section'>
    <div className='row'>
      <div className='col-md-6'>
        <img src={rental.image} alt=''></img>
      </div>
      <div className='col-md-6'>
    <RentalMap location={`${rental.city}, ${rental.street}`}/>
      </div>
    </div>
  </div>

  <div className='details-section'>
    <div className='row'>
      <div className='col-md-8'>
       {this.renderRentalInfo(rental)}
      </div>
      <div className='col-md-4'>
      <Booking rental={rental}/> 
      </div>


<div className="row">
  <div className="col-md-8">
    <section style={{marginBottom: '40px'}}>
      <h2>Reviews</h2>
      <div key='review._id' className="card review-card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-2 user-image">
                <img src="https://image.ibb.co/jw55Ex/def_face.jpg" className="img img-rounded img-fluid"/>
                <p className="text-secondary text-center">review.createdAt</p>
            </div>
            <div className="col-md-10">
              <div>
                <a><strong>review.user.username</strong></a>
                <div className="review-section">
                  <StarRatings
                    rating={5}
                    starRatedColor="orange"
                    starHoverColor="orange"
                    starDimension="25px"
                    starSpacing="2px"
                    numberOfStars={5}
                    name='rating'
                  />
                </div>
              </div>
              <div className="clearfix"></div>
              <p>review.text</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

    </div>
  </div>
</section>

      </div>
    )
        }
        else {
          return <h1>loading ....</h1> 
        }
  }
}

const mapStateToProps = (state) => {
    return {
   rental:state.rental.data,
   isloading:state.rental.isloading
     }

 }

export default connect(mapStateToProps)(RentalDetail);
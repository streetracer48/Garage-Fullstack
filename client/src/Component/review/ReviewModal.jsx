import React, {Component} from 'react'
import Modal from 'react-responsive-modal'
import {connect} from 'react-redux'
// import {ResError} from '../../../utils/ResErrors/ResErrors'
import StarRatings from 'react-star-ratings';
import * as action from '../../actions/'
import { ToastContainer, toast } from 'react-toastify';

 class ReviewModal extends Component  {

state = {
    open: false,
    text:'',
    rating:3
}

closeModal = () => {
  this.setState({
      open:false
  })
}

giveReview = () => {
 const {text, rating} = this.state
    
    this.props.dispatch(action.createReview(this.props.bookingId,{text, rating}))
}

openModal = () => {
    this.setState({open:true})
}

handleChange = (event) => {
    this.setState({
        text:event.target.value
    })
}

changeRating = ( newRating, name ) => {
    this.setState({
      rating: newRating
    });
  }
    
 render () {

    const {open, text} = this.state
    return(
        <React.Fragment>
             <button type='button' style={{marginLeft:'10px'}} onClick={this.openModal} className='btn btn-bwm'>Review</button>
            <Modal open={open} onClose={this.closeModal} little classNames={{ modal: 'booking-modal' }}>
            <h4 className='modal-title title'>Write a Review </h4>
            <div className='modal-body'>
            <textarea
            style={{marginBottom:"15px"}} 
            value={text}
            onChange={this.handleChange}
            className="form-control"
            placeholder="Write your experience with rental place"
            rows={3}
            cols={50}
            >

            </textarea>

            <StarRatings
          rating={this.state.rating}
          starRatedColor="orange"
          starHoverColor="orange"
          starDimension='25px'
          changeRating={this.changeRating}
          numberOfStars={5}
          name='rating'
        />
            </div>
    {/* <ResError errors={errors}/> */}
    <div className='modal-footer'>
        <button type='button' disabled={!text} onClick={this.giveReview} className='btn btn-bwm'>Confirm</button>
        <button type='button' onClick={this.closeModal} className='btn btn-bwm'>Cancel</button>
    </div>
    
    </Modal>
    </React.Fragment>
    )
    }
     
}

export default connect() (ReviewModal)
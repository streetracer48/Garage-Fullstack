import React, {Component} from 'react'
import Modal from 'react-responsive-modal'
// import {ResError} from '../../../utils/ResErrors/ResErrors'

 class ReviewModal extends Component  {

state = {
    open: false
}

closeModal = () => {
  this.setState({
      open:false
  })
}

giveReview = () => {

}

openModal = () => {
    this.setState({open:true})
}
    
 render () {

    const {open} = this.state
    return(
        <React.Fragment>
             <button type='button' style={{marginLeft:'10px'}} onClick={this.openModal} className='btn btn-bwm'>Review</button>
            <Modal open={open} closeModal={this.closeModal} little classNames={{ modal: 'booking-modal' }}>
            <h4 className='modal-title title'>Write a Review </h4>
            <div className='modal-body'>
            
                <p>Do you confirm your booking for selected days?</p>
            </div>
    {/* <ResError errors={errors}/> */}
    <div className='modal-footer'>
        <button type='button' onClick={this.giveReview} className='btn btn-bwm'>Confirm</button>
        <button type='button' onClick={this.closeModal} className='btn btn-bwm'>Cancel</button>
    </div>
    
    </Modal>
    </React.Fragment>
    )
    }
     
}

export default ReviewModal
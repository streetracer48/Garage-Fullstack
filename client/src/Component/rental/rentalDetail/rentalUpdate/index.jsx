import React,{Component} from 'react';
import {connect} from 'react-redux'
import { RentalAssets } from '../rentalAssets';
// import { toUpperCase, rentalType } from 'helpers';

import { EditableInput } from '../../../shared/editable/EditableInput';
import { EditableSelect } from '../../../shared/editable/editableSelect';
import { EditableText } from '../../../shared/editable/EditableText';
import * as actions from '../../../../actions/index'
class RentalDetailUpdate extends Component {

  updateRental = (rentalData) => {
    console.log(rentalData)
     const {rental: {_id}, dispatch } = this.props;

     dispatch(actions.updateRental(_id, rentalData));
     
  }
  resetRentalErrors() {
    this.props.dispatch(actions.resetRentalErrors());
  }
    
  render () {
    const {rental, errors} = this.props;
  
  return (
    <div className='rental'>
     <p>edit here</p>
     <label className={`rental-label rental-type ${rental.category}`}> Shared </label>
     <EditableSelect entity={rental}
                                    entityField={'shared'}
                                    className={`rental-type ${rental.category}`}
                                    updateEntity={this.updateRental}
                                    options={[true, false]}
                                    containerStyle={{'display': 'inline-block'}}
                                     errors={errors}
                                     resetErrors={this.resetRentalErrors}
                                     />

                                <EditableSelect entity={rental}
                                    entityField={'category'}
                                    className={`rental-type ${rental.category}`}
                                    updateEntity={this.updateRental}
                                    options={['apartment', 'house', 'condo']}
                                     errors={errors}
                                     resetErrors={this.resetRentalErrors} 
                                    />                      
      <div className="rental-owner">
        <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="owner"/>
        <span>{rental.user && rental.user.username}</span>
      </div>
      {/* <h1 className='rental-title'>{rental.title}</h1> */}
      <EditableInput 
      entity={rental}
     entityField={'title'}
    className={'rental-title'}
    />
      <h2 className='rental-city'>{rental.city}</h2>

                             <EditableInput 
                                  entity={rental}
                                   entityField={'title'}
                                   className={'rental-title'}
                                   updateEntity={this.updateRental}
                                   errors={errors}
                                
                                   resetErrors={this.resetRentalErrors} 
                                    />
                             <EditableInput entity={rental}
                                   entityField={'city'}
                                   className={'rental-city'}
                                   updateEntity={this.updateRental}
                                   errors={errors}
                                  resetErrors={this.resetRentalErrors}
                                    />
                                     <EditableInput entity={rental}
                                   entityField={'street'}
                                   className={'rental-street'}
                                   updateEntity={this.updateRental}
                                   errors={errors}
                                  resetErrors={this.resetRentalErrors} 
                                   
                                   />


      <div className='rental-room-info'>

      <span><i className='fa fa-building'></i>

      <EditableInput entity={rental}
                                   entityField={'bedrooms'}
                                   className={'rental-bedrooms'}
                                   containerStyle={{'display': 'inline-block'}}
                                   updateEntity={this.updateRental}
                                   errors={errors}
                                   resetErrors={this.resetRentalErrors}
                                /> bedrooms</span>
      
        <span><i className='fa fa-user'></i> {rental.bedrooms + 4} guests</span>
        <span><i className='fa fa-bed'></i> {rental.bedrooms + 2} beds</span>
      </div>
      {/* <p className='rental-description'>
        {rental.description}
      </p> */}

<EditableText  entity={rental}
                                   entityField={'description'}
                                   className={'rental-description'}
                                   updateEntity={this.updateRental}
                                   rows={6}
                                   cols={50}
                                   errors={errors}
                                   />
      <hr></hr>
      <RentalAssets />
    </div>
  )

  }

}

const mapToProps = (state) => {
  errors: state.rental.errors
}

export default  connect(mapToProps)(RentalDetailUpdate)
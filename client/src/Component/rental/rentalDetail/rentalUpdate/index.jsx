import React,{Component} from 'react';
import { RentalAssets } from '../rentalAssets';
// import { toUpperCase, rentalType } from 'helpers';
class RentalDetailUpdate extends Component {
    
  render () {
    const rental = this.props.rental;
  
  return (
    <div className='rental'>
     <p>edit here</p>
      <h2 className={`rental-type ${rental.category}`}>{rental.shared} {rental.category}</h2>
      <div className="rental-owner">
        <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="owner"/>
        <span>{rental.user && rental.user.username}</span>
      </div>
      <h1 className='rental-title'>{rental.title}</h1>
      <h2 className='rental-city'>{rental.city}</h2>
      <div className='rental-room-info'>
        <span><i className='fa fa-building'></i>{rental.bedrooms} bedrooms</span>
        <span><i className='fa fa-user'></i> {rental.bedrooms + 4} guests</span>
        <span><i className='fa fa-bed'></i> {rental.bedrooms + 2} beds</span>
      </div>
      <p className='rental-description'>
        {rental.description}
      </p>
      <hr></hr>
      <RentalAssets />
    </div>
  )

  }

}

export default RentalDetailUpdate
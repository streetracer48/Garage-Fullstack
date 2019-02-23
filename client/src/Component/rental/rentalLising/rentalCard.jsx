import React from 'react'
import {Link} from 'react-router-dom'
import { rentalType } from '../../../helpers/';



export default function RentalCard({ rental}) {
 
    const {_id, city, street, category, description, shared, bedrooms, title, image} =rental

  //   const renderCardImage = (image) =>{
  //     if(image.length > 0){
  //         return images
  //     } else {
  //         return 'http://via.placeholder.com/350x250'
  //     }
  // }
  return (
    <div class='col-md-3 col-xs-6'>
    <Link to={`/rentals/${_id}`}>
    <div class='card bwm-card'>
      <img class='card-img-top' src={image} alt=''></img>
      <div class='card-block'>
      <h6 className={`card-subtitle ${category}`}>{rentalType(shared)} {category} &#183; {city}</h6>
        <h4 class='card-title'>{title && title}</h4>
        <p class='card-text'>{description && description}</p>
        <a href='' class='card-link'>More Info</a>
      </div>
      
    </div>
    </Link>
</div>
  )
}

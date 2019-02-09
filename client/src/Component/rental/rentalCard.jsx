import React from 'react'

export default function RentalCard({ rental}) {
    const {id, city, street, category, description, shared, bedrooms, title} =rental
  return (
    <div class='col-md-3 col-xs-6'>
    <div class='card bwm-card'>
      <img class='card-img-top' src='http://via.placeholder.com/350x250' alt=''></img>
      <div class='card-block'>
        <h6 class='card-subtitle'>{shared ?'Shared':'whole'} </h6>
        <h4 class='card-title'>{title && title}</h4>
        <p class='card-text'>{description && description}</p>
        <a href='' class='card-link'>More Info</a>
      </div>
    </div>
</div>
  )
}

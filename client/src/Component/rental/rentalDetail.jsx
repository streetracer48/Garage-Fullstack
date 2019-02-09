import React, { Component } from 'react'


export default class rentalDetail extends Component { 
    render() {
    return (
        <div className='container'>
     I am a detail {this.props.match.params.id}
      </div>
    )
  }
}

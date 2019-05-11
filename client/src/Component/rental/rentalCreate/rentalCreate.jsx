import React, {Component} from 'react'
import RentalCreateForm from './rentalCreateForm'
import { connect } from 'react-redux'
import {createRental} from '../../../actions/index'
import { Redirect } from 'react-router-dom'

class RentalCreate extends Component {

  state = {

    errors:[],
    redirect:false
  }

    rentalCategories = ['apartment','house','condo'];

    submitCreateRental = (rentalData) => {
     createRental(rentalData).then(
       (rental) => this.setState({redirect:true}),
       (errors) =>this.setState({errors})
       )
    }
     

     render () {

      if(this.state.redirect){
       return <Redirect to={{ pathname:'/rentals', state: { successRentalCreated: true } }}/>

      }


          return (
            <section id='newRental'>
            <div className='bwm-form'>
              <div className='row'>
                <div className='col-md-5'>
                  <h1 className='page-title'>Create Rental</h1>
                  <RentalCreateForm 
                  submitCreateRental={this.submitCreateRental}
                   options ={this.rentalCategories} />
                </div>
                <div className='col-md-6 ml-auto'>
                  <div className='image-container'>
                    <h2 className='catchphrase'>Hundreds of awesome places in reach of few clicks.</h2>
                    <img src={process.env.PUBLIC_URL + '/img/create-rental.jpg'} alt=''/>
                  </div>
                </div>
              </div>
            </div>
          </section>

          )
      }
}

const mapStateToProps = (state) => {

  return {
     rentals:state.rentals
  }
  
 }



export default connect(mapStateToProps)(RentalCreate) 
import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as action from '../../../actions/index'
import RentalList from '../rentalLising/rentalList'

class RentalSearchListing extends Component {

    state = {
        searchCity:''
     }

     componentDidMount()
     {
         this.searchRentByCity();

     }

     searchRentByCity = () => {
         const searchCity = this.props.match.params.city;
         this.setState({
             ...this.state,
             searchCity
         })
         this.props.dispatch(action.fetchRentals(searchCity));

      }

      componentDidUpdate(prevProps) {
        const currentUrlParam = this.props.match.params.city;
        const prevUrlParam = prevProps.match.params.city;
        console.log('prevUrlParam',prevUrlParam)
    
        if (currentUrlParam !== prevUrlParam) {
          this.searchRentByCity();
        }
      }

      renderTitle () {
           const {errors, data} = this.props.rentals;
           const {searchCity} = this.state;

           let title = '';

           if(errors.length>0)
           {
               title = errors[0].detail;
           }

           if(data.length > 0)
           {
            title = `Your Home in City of ${searchCity}`;

           }
           return <h1 className="page-title">{title}</h1>

       }



     render () {
        
         return(
            <section id="rentalListing">

         {this.renderTitle()}
   <RentalList rentals={this.props.rentals.data}/>
   </section>
         )
     }
}

const mapStateToProps = (state) => {
    return {

        rentals:state.rentals

    }

}

export default connect(mapStateToProps) (RentalSearchListing)
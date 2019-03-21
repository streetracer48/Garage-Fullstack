import React,{Component} from 'react';
import { Link } from 'react-router-dom'
import * as moment from 'moment';

class  RentalManageCard extends Component {

  state = {
    wantDelete: false
  }

showDeleteMenu = () => {
  this.setState({
    wantDelete: true
  });
}

closeDeleteMenu = () =>{
  this.setState({
    wantDelete: false
  })
}

deleteRental(rentalId, rentalIndex) {
  this.setState({wantDelete: false});

 this.props.deleteRentalCb(rentalId, rentalIndex);
}

   render () {
    const {rental, modal, rentalIndex} = this.props;
const { wantDelete } = this.state;
    return (
      <div className="col-md-4">
        <div className="card text-center">
          <div className="card-block">
            <h4 className="card-title">{rental.title} - {rental.city}</h4>
            <Link className="btn btn-bwm" to={`/rentals/${rental._id}`}>Go to Rental</Link>
            {rental.bookings && rental.bookings.length > 0 && modal}
          </div>
          <div className="card-footer text-muted">
            Created at {moment(rental.createdAt).format('MMM Do Y')}

            { !wantDelete &&
              <React.Fragment>
                <button onClick={() => { this.showDeleteMenu() }} className='btn btn-danger'> Delete </button>
                <Link className='btn btn-warning' to={{pathname: `/rentals/${rental._id}`, state: { isUpdate: true }}}> Edit </Link>
              </React.Fragment>
            }
            { wantDelete &&
              <div className='delete-menu'>
                Do you confirm?
                <button onClick={() => {this.deleteRental(rental._id, rentalIndex)}} className='btn btn-danger'> Yes </button>
                <button onClick={() => { this.closeDeleteMenu() }} className='btn btn-success'> No </button>
              </div>
            }
          </div>
        </div>
      </div>
    )
   }

  
}

export default RentalManageCard
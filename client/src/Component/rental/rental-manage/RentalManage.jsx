import React, { Component } from 'react'
import { connect} from 'react-redux'
import * as actions from '../../../actions/index'

 class RentalManager  extends Component {

    componentDidMount() {
         this.props.dispatch(actions.UserRental())
    }

    render() {
        return (
            <div>
               this is RentalManage 
            </div>
        )
    }
}


export default connect() (RentalManager);
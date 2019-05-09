import React,{Component} from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { createOptions, formStyles, buttonStyles, paragraphStyle } from './styles';

class CheckoutForm extends Component {


    state = {
        error:'undefined'
    }
    render() {
        const { error } = this.state;
    
        return (
          <form {...formStyles()}>
            <CardElement {...createOptions()}/>
            <p {...paragraphStyle()}>*You will be not charger yet.</p>
    
            {error && <div className="alert alert-danger alert-payment">{error}</div>}
    
            <button {...buttonStyles()} className="btn btn-success">Confirm Payment</button>
          </form>
        )
      }
    

}

export default CheckoutForm
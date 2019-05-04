import React,{Component} from 'react'

class EditableInput extends Component {

    state = {
        isActive:false,
        value:undefined,
        originValue:undefined
    }

    
    componentDidMount() {
        const {entity, entityField} = this.props;

        const value = entity[entityField];
        
        this.setState({
            value,
            originValue:value
        })
    }
    

    
    handleChange = (event)=> {
        this.setState({
            value:event.target.value
        })

    }
    

    render() {
        const {value} = this.state;
         return(
             <div>
      <input
          onChange={(event) => this.handleChange(event)}
      value={value} />
             </div>

         )
    }


}

export default EditableInput
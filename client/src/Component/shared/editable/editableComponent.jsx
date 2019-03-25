import React, {Component} from 'react'


class EditableComponent extends Component {
    
    state = {
         isActive:false,
         value:undefined,
         originValue:undefined
    }

    componentDidMount = () => {
      this.setOriginValue();
    }

    componentDidUpdate() {
     const {errors, entityField, resetErrors } = this.props;
 
     if (errors && errors.length > 0) {
       this.setOriginValue();
       resetErrors();
     }
   }
    
    setOriginValue = () => {
         const {entity, entityField} = this.props;

         this.setState ( {
             value:entity[entityField],
             originValue:entity[entityField],
             isActive:false
         })
    }

    disableEdit = () => {
         this.setState({
             isActive:false
         })
    }

    enableEdit = () =>{
         console.log('hello data')
         this.setState({
             isActive:true
         })
    }

    update = () => {
          const {value, originValue} =this.state;
          const { updateEntity, entityField}=this.props;

          if(value !== originValue) {
               updateEntity({[entityField]:value})
            this.setState({
                  isActive:false,
                  originValue:value
            })
          }
    }

     handleChange = (event) => {
           this.setState({
                 value:event.target.value
           })
     }

    
    }



     
 

export default EditableComponent
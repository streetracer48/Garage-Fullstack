import React from 'react'

export const SelectInput = ( {
 input,
 label,
 options,
 className,

 meta:{touched, error, warning}

} ) => {

    const renderOption = () => {
         return options.map((option, index) => {
             return <option key={index} value={option}>{option}</option> 
          });
     }


     return (
         <div className='form-group'>
           <label>{label}</label>
           <div className='input-group'>
             <select {...input} className={className}>
             {renderOption()}
             </select>
           </div>

           {touched && ((
               error && <div className='alert alert-danger'>{error}</div>
           ))}


         </div>
     )



}

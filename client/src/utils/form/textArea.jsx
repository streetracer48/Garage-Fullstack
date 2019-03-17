import React from 'react'

export const TextArea = ( {
 input,
 label,
type,
rows,
className,
meta:{touched, error, warning}

} ) => (
    <div className='form-control'>
    <label>{label}</label>
    <div className='input-group'>
     <textarea {...input} type={type} rows={rows} className={className}></textarea>
    </div>

    {touched &&
     ((error && <div className='alert alert-danger'>{error}</div>))
    }
    
    </div>

)


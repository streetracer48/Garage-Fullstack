const mongoose = require('mongoose');

const Schema =  mongoose.Schema;

const userSchema = new Schema ({ 

    username:{
        type:String,
        min:[4, 'Too short, min is 4 Characters'],
        max:[32, 'Too long, max is 32 Characters']
    },
    email:{
        type:String,
        min:[4, 'Too short, min is 4 characters'],
        max:[32, 'Too long, max is 32 charcters'],
        unique:true,
        lowercase:true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password:{
        type:String,
        min:[4, 'Too short,min is 4 charcters'],
        max:[32,'Too long, max is 32 charcters'],
        required:'password is required'
    },

    rentals:{type: Schema.Types.ObjectId, ref: 'Rental'},

});

module.exports = mongoose.model('User', userSchema)
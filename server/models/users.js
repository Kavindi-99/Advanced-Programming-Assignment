const mongoose = require('mongoose'); // Erase if already required

var user = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    contactNo : {
        type:Number,

    },
    Address : {
        type:String,
    },
    role:{
        type:String,
        required:true,
    },
    creation_date: { 
        type: Date, 
        default: Date.now
    }
    
});

const User = mongoose.model("user",user);

module.exports = User;
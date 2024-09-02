const mongoose = require('mongoose'); // Erase if already required

var table = new mongoose.Schema({
    TableNo:{
        type:Number,
        required:true,
    },
    Status:{
        type:Number,
        required:true,
    },
    rest:{
        type:String,
        required:true,
    },
    user:{
        type:String,
    },
    creation_date: { 
        type: Date, 
        default: Date.now
    }
    
});

const Table = mongoose.model("table",table);

module.exports = Table;
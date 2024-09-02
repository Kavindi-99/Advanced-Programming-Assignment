const mongoose = require('mongoose'); // Erase if already required

var query = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    query:{
        type:String,
        required:true,
    },
    creation_date: { 
        type: Date, 
        default: Date.now
    }
    
});

const Query = mongoose.model("query",query);

module.exports = Query;
const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    "first_name" : {type : String , require : true},
    "last_name"  : {type : String},
    
},{versionKey:false,timestamps:true});

module.exports = mongoose.model("user",userSchema) ;
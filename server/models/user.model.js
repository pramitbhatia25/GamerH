const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String, required:true
    }, 
    handle:{
        type:String, required:true
    }, 
    steps:{
        type:Number, required:true
    }, 
    email:{
        type:String, required:true, unique: true
    },  
    pass:{
        type:String, required:true
    }
})

const User = mongoose.model('USER', userSchema);

module.exports = User;
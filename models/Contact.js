const mongoose = require('mongoose');
const {Schema} = mongoose;

const chema = new Schema({
    address:{
        type: String,
        required: true
    },
    pincode:{
        type:String,
        required:true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('contact',chema)
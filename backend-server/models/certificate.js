const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const certificate = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    rating:{
        type:String,
        required:true
    },
    expiry:{
        type:String,
        required:false
    },
    // likes:[{type:ObjectId}],
    postedBy:{
       type:ObjectId,
       ref:"Userdata"
    }
},{timestamps:true})

mongoose.model("Certificate",certificate)
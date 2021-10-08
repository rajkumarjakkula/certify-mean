const mongoose=require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const Admin= new mongoose.Schema({
    adminname:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    sentrequests:{
        type:ObjectId,
        ref:"Userdata"
    }
})
mongoose.model("Admin",Admin)

const mongoose=require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
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
    requests:[{
        type:ObjectId,
        ref:"Admin"
    }],
})
mongoose.model('Userdata',userSchema)

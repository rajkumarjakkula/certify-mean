const express= require('express')
const router = express.Router()
const mongoose=require('mongoose')
const User = mongoose.model('Userdata')
const Admin = mongoose.model('Admin')
const Certificate=mongoose.model('Certificate')
require('dotenv').config()
const jwt=require("jsonwebtoken")


const middleware=(req,res,next)=>{
    //console.log(req.headers)
      const {authorization} =req.headers
   //console.log(authorization,"dfs")
      if(!authorization){
          return res.status(401).json({error:"you must be logged in"})
      }
      const token=authorization.replace("Bearer ","")
    //console.log(token,"fadgfs")
      jwt.verify(token,JWT_SERECTKEY,(err,payload)=>{
          if(err)
          {
              return res.status(401).json({error:"you must be logged in"})
          }
       //   console.log(payload,token)
          const {_id}=payload
          User.findById(_id).then(userdata=>{
              console.log(userdata)
              req.user=userdata
              next()
          })  
      })
  }
const adminmiddleware=(req,res,next)=>{
//  console.log(req.headers)
  const {authorization} =req.headers
 //console.log(authorization,"dfs")
  if(!authorization){
      return res.status(401).json({error:"yo must be logged in"})
  }
  const token=authorization.replace("Bearer ","")
//  console.log(token,"fadgfs")
  jwt.verify(token,JWT_SERECTKEY,(err,payload)=>{
      if(err){
          return res.status(401).json({error:"you must be logged in"})
      }
   //  console.log(payload,token)
      const {_id}=payload
      Admin.findById(_id).then(userdata=>{
          req.user=userdata
      //    console.log(userdata)
          next()
      })  
  })
}



module.exports=router
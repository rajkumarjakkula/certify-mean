const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const User = mongoose.model('Userdata')
const Admin=mongoose.model('Admin')
const bcrypt = require('bcryptjs')
require('dotenv').config()
const jwt=require("jsonwebtoken")
const JWT_SERECTKEY=process.env.JWT_SERECTKEY;

router.post('/signup',(req,res)=>{
 
  const {name,email,password}=req.body
  if (!email  || !password ||!name){
      return res.status(422).json({error:"please enter all the fields"})
  }
  User.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
          return res.status(422).json({error:"user already exists"})
      }
      bcrypt.hash(password,13)
      .then(hashedpassword=>{
          const user = new User(  {
              email:email,
              password:hashedpassword,
              name
          })
          user.save()
          .then(()=>{
              return res.json({message:"successfully Signup"})
          })
          .catch(error=>{
                  // console.log(error)
                  return res.json({error:error})
          })
      })  
  })
  .catch(error=>{
      console.log(error)
  })
})

router.post('/socialLogin',async (req,res)=>{
    const {username,email,password}=req.body
    if(!email || !password || !username){
        return res.status(422).json({error:"please enter all the fields"})
    }
    try{
        const user =await User.findOne({email:email})
        if(!user){
            console.log(user,"raj")
            bcrypt.hash(password,13)
            .then(hashedpassword=>{
            const user1 = new User({
                email:email,
                password:hashedpassword,
                name:username
            })
            console.log(user1)
            user1.save()
            .then(()=>{
                const token=jwt.sign({_id:user1._id},JWT_SERECTKEY)
               // console.log(token)
                const {_id,name,email}=user1
             return res.json({token:token,user:{_id,name,email}})
            })
            .catch(error=>{
                 console.log(error)
                return res.json({error:error})
            })
            })
        }
        if(user){
            try{
            const doMatch=await bcrypt.compare(password,user.password);
            if(doMatch){
                const token=await jwt.sign({_id:user._id},JWT_SERECTKEY)
                //console.log(token)
                const {_id,name,email}=user
                return res.json({token:token,user:{_id,name,email}})
            }
            else{
                res.send({message:"some problem in backend"})
            }
            }
            catch(err)
            {
                console.log(err)
                res.send({err})
            }
            
        }
    }
    catch{
        res.send("error")
    }
})

router.post('/signin',(req,res,next)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(422).json({error:"please enter all the fields"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        //console.log(savedUser)
        // if(null){
        //  //   console.log(savedUser)
        // }
        if(!savedUser){
            return res.status(422).json({error:"Invalid mail or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token=jwt.sign({_id:savedUser._id},JWT_SERECTKEY)
                //console.log(token)
                const {_id,name,email}=savedUser
                res.json({token:token,user:{_id,name,email}})
            }
            else
            {   
                res.json({message:"incorrect password"})
            }  
        })
        .catch(err=>{
            res.json({error:err})
        })
    })
})


router.post('/adminsignin',async (req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(402).json({message:"please enter all the fields"})
    }
    try{
    const admin=await Admin.findOne({email:email})
    if(admin){
        const doMatch=await bcrypt.compare(password,admin.password)
        if(doMatch){
            const token=jwt.sign({_id:admin._id},JWT_SERECTKEY)
            //console.log(token)
            const {_id,adminname,email}=admin
            res.json({token:token,admin:{_id,adminname,email}})
        }
        else{
            res.json({message:"incorrect password"})
        }
    }
    }
    catch(err){
        console.log(err)
        res.send(err)
    }

    
})

module.exports=router
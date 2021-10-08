const express = require('express')
const router = express.Router()
const mongoose=require('mongoose')
const User = mongoose.model('Userdata')
const Admin = mongoose.model('Admin')
const Certificate=mongoose.model('Certificate')
require('dotenv').config()
const jwt=require("jsonwebtoken")
const JWT_SERECTKEY=process.env.JWT_SERECTKEY;

const middleware=(req,res,next)=>{
    //console.log(req.headers)
      const {authorization} =req.headers
  // console.log(authorization,"dfs")
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
           //   console.log(userdata)
              req.user=userdata
              next()
          })  
      })
  }
const adminmiddleware=(req,res,next)=>{
 // console.log(req.headers)
  const {authorization} =req.headers
// console.log(authorization,"dfs")
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


router.get('/allusers',adminmiddleware,(req,res)=>{
    User.find()
   // console.log("entered..")
    .then(Users=>{
        res.json(Users)
    })
    .catch(err=>{
        res.json(err)
    })
})


router.get('/profile',middleware,(req,res)=>{
   // console.log(req.user)
   User.findOne({_id:req.user._id})
    .then(mypost=>{
        return res.json(mypost)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mycertificates',middleware,(req,res)=>{
        Certificate.find({postedBy:req.user._id})
        .populate("postedBy","_id name")
        .sort("-createdAt")
        .then(mypost=>{
            res.json(mypost)
        })
        .catch(err=>{
            console.log(err)
        })
})


router.get('/userprofile/:id',middleware,async (req,res)=>{
    try{
    const user=await User.findById({_id:req.params.id})
  //  console.log(user._id)
    const alldetails= await Certificate.find({postedBy:user._id}).populate("postedBy","_id").sort("-createdAt")
    if(alldetails){
        res.json({alldetails:alldetails,user:user})
    }
    else{
        res.send("no posts are avialable")
    }
    }
    catch(err)
    {
        res.send(err)
    }
})


router.post('/addcertificate',middleware,(req,res)=>{
    const {title,body,pic,rating,expiry}=req.body
   // console.log(req.user)
    if(!title || !body || !pic ||!rating){
        return res.status(422).json({error:"please fill all the fields"})
    }
    const post = new Certificate({
        title,
        photo:pic,
        body,
        rating,
        expiry,
        time:new Date().getTime(),
        postedBy:req.user
    })
    post.save()
    .then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/allcertificates',adminmiddleware,(req,res)=>{
    Certificate.find()
    .sort('-createdAt')
    .then((certificates)=>{
        res.send(certificates)
    })
})

router.put('/updateuser/:userId',adminmiddleware,(req,res)=>{

    // const id=req.params.userId;
    // User.findByIdAndUpdate(id,req.body,{userFindAndModify:false})
    // .then(user=>{
    //     if(!user){
    //     return res.status(422).json({message:"cannot update this user"})
    //     }
    //     else{
    //         res.send(user)
    //     }
    // })
    // .catch(err=>{
    //     console.log(err)
    // })
})

router.get('/adminprofile',adminmiddleware,(req,res)=>{
    // console.log(req.user)
    Admin.findOne({_id:req.user._id})
     .then(mypost=>{
         return res.json(mypost)
     })
     .catch(err=>{
         console.log(err)
     })
 })
router.delete('/deleteuser/:Id',adminmiddleware,(req,res)=>{
    User.findByIdAndDelete({_id:req.params.Id})
    .then(certificate=>{
        if(!certificate){
            return res.status(422).json({error:err})
        }else{
            res.json({
                message:"user removed successfully"
            })
        }
            
    })
    .catch(err=>{
        console.log(err)
    })
})


router.delete('/deletecertificate/:Id',middleware,(req,res)=>{
    Certificate.findByIdAndDelete({_id:req.params.Id})
    .then(certificate=>{
        if(!certificate){
            return res.status(422).json({error:err})
        }else{
            res.json({
                message:"certificate deleted successfully"
            })
        }
            
    })
    .catch(err=>{
        console.log(err)
    })
})
router.delete('/deleteadminsidecertificate/:Id',adminmiddleware,(req,res)=>{
    Certificate.findByIdAndDelete({_id:req.params.Id})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:err})
        }else{
            res.send({
                message:"certificate deleted successfully"
            })
        }
            
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/handlerequests/:id',middleware,async (req,res)=>{
   // console.log(req.params.id)
    const data=[]
    for(const name of req.params.id.split(",")){
        await Admin.findOne({_id:name})
        .then(savedUser=>{
            data.push({name:savedUser.adminname,email:savedUser.email})
            //console.log(data)
        })
    }
    res.send(data)
   
})

router.get('/seeallrequests/:id',middleware,async (req,res)=>{
    // console.log(req.params.id)
     const data=[]
     if(req.params.id.length==0){
         return res.json({message:"no requests are avilable"})
     }
     for(const name of req.params.id.split(",")){
         await User.findOne({_id:name})
         .then(savedUser=>{
             data.push({name:savedUser.name,email:savedUser.email})
             //console.log(data)
         })
     }
     res.send(data)
    
 })

router.put('/requests/:id',adminmiddleware,(req,res)=>{
    console.log(req.user._id)
    User.findByIdAndUpdate(req.params.id,{
        $push:{requests:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.send({error:err})
        }
        else{
       // console.log(result)
        res.json(result)
        }
    })
    Admin.findByIdAndUpdate(req.user._id,{
        $push:{sentrequests:req.params.id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.send({error:err})
        }
        
    })
})
module.exports=router
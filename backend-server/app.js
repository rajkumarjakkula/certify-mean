const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors=require('cors')
require('dotenv').config()
const PORT=process.env.PORT ||5000

const uri = process.env.mongoURI

mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true,
});

mongoose.connection.on('connected',()=>{
    console.log("Hello developer, i am connected you can do databae stuuff...")
})

mongoose.connection.on('error',(err)=>{
    console.log("mongo error",err)
})

app.use(cors())
require('./models/admin')
require('./models/users')
require('./models/certificate')
app.use(express.json())
app.use(require('./routes/crud'))
app.use(require('./routes/auth'))
app.use(require('./routes/paiduser'))

app.listen(PORT,()=>{
    console.log("port working at", 5000)
});
const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
require('./Config/config')
const stripe = require('stripe')('sk_test_51NwHkGSEDFbx4uMAi4gaS8gIKK34IfRc6c1ang04n7KDxk5t8rRyid4fKedWCBqlaBUJeKDMczwzhCtPU1nWriaq00ahzBlJ8c');

const app=express()
app.use(express.static('public'));
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
  
app.use(cors({
  origin:[process.env.ORIGIN],
  methods:['GET,POST','PATCH'],
  credentials:true
  }))

const userRouter=require('./Routes/userRoutes')
app.use('/',userRouter)
const adminRouter=require('./Routes/adminRoutes')
app.use('/admin/',adminRouter)
const managerRouter=require('./Routes/mangerRoutes')
app.use('/manager/',managerRouter)

app.listen(4000,()=>{
    console.log('server running at 4000')
})
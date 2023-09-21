const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
require('./Config/config')

const app=express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
  
app.use(cors({
  origin:['http://localhost:3000'],
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
const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const cors=require('cors')
require('dotenv').config()

const app=express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('connected to mongoose');
    })
    .catch((err) => {
      console.log(err.message);
    });
  
    app.use(cors({
      origin:['http://localhost:3000'],
      methods:['GET,POST'],
      credentials:true
  }))

app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET','POST'],
    credentials:true
}))

const userRouter=require('./Routes/userRoutes')
app.use('/',userRouter)

app.listen(4000,()=>{
    console.log('server running at 4000')
})
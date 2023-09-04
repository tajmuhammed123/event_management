const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mob:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    is_manager:{
        type:Boolean,
        required:true
    },
    is_admin:{
        type:Boolean,
        default:false
    }
})

const user=mongoose.model('user',userSchema)
module.exports=user
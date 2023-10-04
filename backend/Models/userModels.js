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
    is_admin:{
        type:Boolean,
        default:false
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    is_block:{
        type:Boolean,
        default:false
    },
    wallet_amount:{
        type:Number,
        default:0
    }
})

const user=mongoose.model('user',userSchema)
module.exports=user
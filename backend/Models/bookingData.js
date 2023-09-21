const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    manager_id:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    event_name:{
        type:String,
        required:true
    },
    mob:{
        type:String,
        required:true
    },
    event:{
        type:Array,
        required:true
    },
    preffered_dishes:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    additional_data:{
        type:String,
        required:true
    }
})

const bookingData=mongoose.model('bookingData',bookingSchema)
module.exports=bookingData
const mongoose=require('mongoose')

const evetDataSchema=new mongoose.Schema({
    event_name:{
        type:String,
        required:true
    },
    event_image:{
        type:String,
        required:true
    }
})

const eventData=mongoose.model('eventData',evetDataSchema)
module.exports=eventData
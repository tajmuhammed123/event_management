const mongoose=require('mongoose')

const evetDataSchema=new mongoose.Schema({
    
    team_name:{
        type:String,
        required:true
    },
    salutation:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    cover_image:{
        type:String,
        required:true
    },
    multipleImages:{
        type:Array,
        required:true
    },
    events:{
        type:Object,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    dishes:{
        type:String,
        required:true
    },
})

const managerSchema=new mongoose.Schema({
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
    is_verified:{
        type:Boolean,
        default:false
    },
    is_authorized:{
        type:Boolean,
        default:false
    },
    eventData:{type:evetDataSchema}
})

const manager=mongoose.model('manager',managerSchema)
module.exports=manager
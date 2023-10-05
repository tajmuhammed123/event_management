const User=require('../Models/userModels')
const Manager=require('../Models/managerModel')
const Payment=require('../Models/transactionModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const  Tokenmodel =require('../Models/token.js')
const { MultiUploadCloudinary, uploadToCloudinary } = require('../utils/cloudinary')
const eventListModel = require('../Models/eventsModel')

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        
        const exists = await User.findOne({ email: email });
        console.log(exists);
        
        if (exists) {
            const access = await bcrypt.compare(password, exists.password);
            
            if (access && exists.is_admin===true) {
                console.log('user logined');

                let token = await Tokenmodel.findOne({ userId: exists._id });
                console.log(token);
                if (!token) {
                    console.log('hjkgh');
                    token = await new Tokenmodel({
                        userId: exists._id,
                        token: jwt.sign({ userId: exists._id }, process.env.JwtSecretKey, { expiresIn: '1d' })
                    });
                    await token.save();
                }
                
                return res.status(200).json({ user: exists, token: token, alert: 'Logined', status: true });
            } else {
                return res.status(404).json({ alert: "Password is wrong", status: false });
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

const managerData=async(req,res)=>{
    try {
        const data=await Manager.find({eventData: { $exists: true, $ne: null }})
        return res.status(200).json({data:data,status:true})
    } catch (error) {
        console.log(error.message);
    }
}
const userData=async(req,res)=>{
    try {
        const data=await User.find({})
        return res.status(200).json({data:data,status:true})
    } catch (error) {
        console.log(error.message);
    }
}
const bookingData=async(req,res)=>{
    try {
        const data=await Payment.find({})
        return res.status(200).json({data:data,status:true})
    } catch (error) {
        console.log(error.message);
    }
}

const userBlock=async(req,res)=>{
    try {
        const {id}=req.params
        const user=await User.findById(id)
        const data=await User.findByIdAndUpdate(id,{$set:{is_block:!user.is_block}},{new:true})
        return res.status(200).json({data:data,status:true})
    } catch (error) {
        console.log(error.message);
    }
}

const managerApprove=async(req,res)=>{
    try {
        console.log('fdg');
        const {id}=req.body
        const data=await Manager.findOneAndUpdate({_id:id},{$set:{is_authorized:true}},{upsert:true})
        console.log(data);
        return res.status(200).json({alert:"Approved",status:true})
    } catch (error) {
        console.log(error.message);
    }
}
const managerReject=async(req,res)=>{
    try {
        console.log('fdg');
        const {id}=req.body
        const data=await Manager.findOneAndUpdate({_id:id},{$set:{is_authorized:false}},{upsert:true})
        console.log(data);
        return res.status(200).json({alert:"Rejected",status:false})
    } catch (error) {
        console.log(error.message);
    }
}

const addEvent=async(req,res)=>{
    try {
        console.log('hjkf');
        const {categorey,description}=req.body
        console.log(req.file);
        console.log(req.body);
        const cloudinarydata = await uploadToCloudinary(req.file.path, "categorey");
        console.log(cloudinarydata);
        const data= new eventListModel({
            event_name:categorey,
            event_image:cloudinarydata.url,
            description,
        })
        let rslt=await data.save()
        console.log(rslt);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    adminLogin,
    managerData,
    userData,
    bookingData,
    userBlock,
    managerApprove,
    managerReject,
    addEvent
}
const Manager=require('../Models/managerModel')
const Booking=require('../Models/bookingData')
const Events=require('../Models/eventsModel')
const User=require('../Models/userModels')
const Chat=require('../Models/chatModel')
const Review=require('../Models/reviewModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const  Tokenmodel =require('../Models/token.js')
const { sendEmail } = require('../utils/email')
const { MultiUploadCloudinary, uploadToCloudinary } = require('../utils/cloudinary')

const managerReg = async (req,res)=>{
    try{
        const {name,email,password,mob}=req.body
        const exists=await Manager.findOne({email:email})
        if(exists){
            return res.status(400).json({status: false,message:'Email already in used'});
        }
        console.log(password);
        const hash = await bcrypt.hash(password,10)
        console.log(hash);
        const newUser =  new Manager({
          name,
          email,
          mob,
          password:hash
       })
        let user =  await newUser.save().then(console.log("Registered"))
        const token=await new Tokenmodel ({
            userId:user._id,
            token:jwt.sign({ userId: user._id }, process.env.JwtSecretKey, { expiresIn: 60000 })
          });
          await token.save()
          let subject='Email Verification'
          let text='<p>Hii' + user.name + ', Please click here to <a href="http://localhost:3000/manager/managerverify/' + user._id + '"> Verify </a> your mail.</p>'
          sendEmail(email,subject,text)
          return res.status(200).json({ alert: 'Check your Email and Verify', status: true });
        // return res.status(200).json({ token: token,user:newUser, alert:'Registred', status: true});
    }catch(error){
        console.log(error.message);
    }
}

const uploadImage=async(req,res)=>{
    try {
        console.log('herer');
        console.log(req.files);
    } catch (error) {
        console.log(error.message);
    }
}

const managerLogin=async(req,res)=>{
    try {
        const { email, password } = req.body;
        console.log(email, password);
        
        const exists = await Manager.findOne({ email: email });
        console.log(exists);
        
        if (exists) {
            const access = await bcrypt.compare(password, exists.password);
            
            if (access) {
                console.log('user logined');
                if(exists.is_verified){
                    let token = await Tokenmodel.findOne({ userId: exists._id });
                    console.log(token);
                    if (!token) {
                        console.log('hjkgh');
                        token = await new Tokenmodel({
                            userId: exists._id,
                            token: jwt.sign({ userId: exists._id }, process.env.JwtSecretKey, { expiresIn: 60000 })
                        });
                        await token.save();
                    }
                    return res.status(200).json({ user: exists, token: token, alert: 'Logined', status: true });
                }else{
                    let subject='Email Verification'
                    let text='<p>Hii' + exists.name + ', Please click here to <a href="http://localhost:3000/verifyemail/' + exists._id + '"> Verify </a> your mail.</p>'
                    sendEmail(email,subject,text)
                    return res.status(200).json({ alert: 'Check your Email and Verify', status: false });
                }
            } else {
                return res.status(404).json({ alert: "Password is wrong", status: false });
            }
        }else{
            return res.status(404).json({ alert: "User Not Found", status: false })
        }
    } catch (error) {
        console.log(error.message);
    }
}

const forgotPassword=async(req,res)=>{
    try {
        const { email } = req.body;
        console.log(email);
        const exists = await Manager.findOne({ email: email });
        if(exists){
            await Tokenmodel.findOneAndDelete({
                userId: exists._id
              });
        
              const OTP = generateOtp();
              const tokenmodel=new Tokenmodel({
                userId: exists._id,
                token: OTP
              });
              let subject= "Verify your email account"
              let text=`<div>
              <h1>OTP for reset password</h1>
              <p>${OTP}</p>
              <strong>Do not share your otp</strong>
              </div>`
              await sendEmail(exists.email,subject,text)
              await tokenmodel.save()
              await exists.save()
              console.log('returned');
              return res.status(200).json({message:"Success",status:true});
        }
    } catch (error) {
        console.log(error.message);
    }
}

const VerifyPassword=async(req,res)=>{
    try {
        const { email, otp, password } = req.body;
        const manager = await Manager.findOne({ email: email });
        console.log(manager);
        const token = await Tokenmodel.findOne({ userId: manager._id });
        console.log(token);
        if(otp===token.token){
            const hash = await bcrypt.hash(password,10)
            manager.password = hash;
            await manager.save();
            console.log();
            await Tokenmodel.findOneAndDelete({ userId: manager._id });
            res.status(200).json({message:"Success",status:true});
        }else{
            await Tokenmodel.findOneAndDelete({ userId: manager._id });
            res.status(200).json({message:"Failed",status:false});
        }
    } catch (error) {
        console.log(error.message);
    }
}

const getEventData=async(req,res)=>{
    try {
        const eventData=await Events.find({is_block:false})
        console.log(eventData);
        return res.status(200).json({eventData})
    } catch (error) {
        
    }
}

const eventData=async(req,res)=>{
    try {
        console.log(req.body);
        console.log(req.files,'images');
        console.log(req.files,'data');
        const multipleImages = req.files.filter(file => file.fieldname.startsWith('eventdata[profileImage]'))
console.log("Multiple Images:", multipleImages);

const Imagefilenames = multipleImages.map(file => file.filename)
console.log("Image Filenames:", Imagefilenames);
const cloudinarymultipledata = await MultiUploadCloudinary(multipleImages, "images");
console.log("Cloudinary Multiple Data:", cloudinarymultipledata);

        const cover_image = req.files.filter(file => file.fieldname === 'eventdata[cover_image]')
        console.log(cover_image);
        const cloudinarydata = await uploadToCloudinary(cover_image[0].path, "categorey")
        console.log(cloudinarydata);
        const {userID}=req.params
        const exists=await Manager.findById(userID)
        if(exists){
            const {team_name,salutation,about,events,location,dishes,advance_amount}=req.body.eventdata
            const amount=parseInt(advance_amount)
            console.log(events);
            const newEvent={
                cover_image:cloudinarydata.url,
                team_name,
                salutation,
                about,
                multipleImages:cloudinarymultipledata,
                events,
                location,
                dishes,
                advance_amount:amount

            }
            if(exists.eventData){
                console.log(newEvent);
                await Manager.findOneAndUpdate({ _id: exists._id },
                { $set: { eventData: newEvent } },
                { new: true })
            }else{
                console.log(newEvent);
                exists.eventData=newEvent
                await exists.save()
            }
        }
        return res.status(200).json({ alert:'Data added', status: true});
    } catch (error) {
        console.log(error);
    }
}

const managerData=async(req,res)=>{
    try {
        const {id}=req.params
        const manager=await Manager.findById(id)
        const review=await Review.find({manager:id})
        return res.status(200).json({data:manager, status:true, review:review})

    } catch (error) {
        console.log(error.message);
    }
}

const managerVerify=async(req,res)=>{
    try {
        console.log('hjkgh');
        const manager= req.query.id
        const managerData=await Manager.findOne({_id:manager})
        console.log(managerData);
        await Manager.findOneAndUpdate({_id:manager},{$set:{is_verified:true}},{upsert:true})
        let token = await Tokenmodel.findOne({ userId: manager });
        console.log(token);
        if (!token) {
            token = await new Tokenmodel({
                userId: manager,
                token: jwt.sign({ userId: manager }, process.env.JwtSecretKey, { expiresIn: '1d'})
            });
            await token.save();
        }
        return res.status(200).json({ user: managerData, token: token, alert: 'Verified Logined', status: true });
    } catch (error) {
        console.log(error);
    }
}

const bookingData=async(req,res)=>{
    try {
        console.log('hjhg');
        const {id}=req.params
        const data= await Booking.find({manager_id:id, is_paid:'paid'})
        console.log(data);
        return res.status(200).json({data:data,alert:'booking data'})
    } catch (error) {
        console.log(error.message);
    }
}
const searchUsers=async(req,res)=>{
    try {
        console.log('reached');
        const keyword = req.query.search
          ? {
              $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
              ],
            }
          : {};
          console.log(keyword);
      
        const users = await User.find(keyword) //.find({ _id: { $ne: req.user._id } });
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
    }
}

const fetchChats=async(req,res)=>{
    try {
        console.log('reached');
        const {userId}=req.params
        const result = await Chat.find({ "users.manager": userId }).populate('users.user', '-password')
        .populate('users.manager', '-password')
        .populate('latestMessage').populate({
            path: 'latestMessage',
            populate: {
              path: 'sender.manager',
              select: '-password',
            },
          }).populate({
            path: 'latestMessage',
            populate: {
              path: 'sender.user',
              select: '-password',
            },
          }).then((result)=>{console.log(result),res.send(result)});
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    managerReg,
    uploadImage,
    eventData,
    managerLogin,
    getEventData,
    forgotPassword,
    VerifyPassword,
    managerData,
    managerVerify,
    bookingData,
    searchUsers,
    fetchChats
}
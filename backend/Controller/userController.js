const User=require('../Models/userModels')
const Manager=require('../Models/managerModel')
const Booking=require('../Models/bookingData')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const  Tokenmodel =require('../Models/token.js')

const {sendEmail} =require('../utils/email')

const generateOtp = () => {
    let otp = "";
  for (let i = 0; i < 4; i++) {
    const random = Math.round(Math.random() * 9);
    otp = otp + random;
  }
  return otp;
  };

const userReg = async (req,res)=>{
    try{
        const {name,email,password,mob} = req.body
        console.log(name,email,password,mob);
        const exists=await User.findOne({email:email})
        if(exists){
            return res.status(400).json({status: false,message:'Email already in used'});
        }
        const hash = await bcrypt.hash(password,10)
        const newUser =  new User({
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
        return res.status(200).json({ token: token,user:newUser, alert:'Registred', status: true});
    }catch(error){
        console.log(error.message);
    }
}
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        
        const exists = await User.findOne({ email: email });
        console.log(exists);
        
        if (exists) {
            const access = await bcrypt.compare(password, exists.password);
            
            if (access) {
                console.log('user logined');
                if(exists.is_verified){
                    let token = await Tokenmodel.findOne({ userId: exists._id });
                    console.log(token);
                    if (!token) {
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
        }
    } catch (error) {
        console.log(error.message);
    }
}

const userGoogleLogin=async(req,res)=>{
    try {
        const { name,email, password } = req.body
        const exists=await User.findOne({email:email})

        if (exists) {
          let token = await Tokenmodel.findOne({ userId: exists._id });
        
          if (!token) {
            token = new Tokenmodel({
              userId: exists._id,
              token: jwt.sign({ userId: exists._id }, process.env.JwtSecretKey, { expiresIn: 60000 }),
            });
          } else {
            token.token = jwt.sign({ userId: exists._id }, process.env.JwtSecretKey, { expiresIn: 60000 });
          }
        
          await token.save();
          return res.status(200).json({ token: token, user: exists, alert: 'Registered', status: true });
        }
        
        const hash = await bcrypt.hash(password,10)
        const newUser =  new User({
          name,
          email,
          mob: 1111111111,
          password:hash,
          is_manager:false,
          is_verified:true
       })
    
        let user =  await newUser.save().then(console.log("Registered"))
        const token=await new Tokenmodel ({
            userId:user._id,
            token:jwt.sign({ userId: user._id }, process.env.JwtSecretKey, { expiresIn: 60000 })
          });
          await token.save()
        return res.status(200).json({ token: token,user:newUser, alert:'Registred', status: true});
    } catch (error) {
        console.log(error.message);
    }
}

const VerifyEmail=async(req,res)=>{
    try {
        const user= req.query.id
        const userData=await User.findOne({_id:user})
        console.log(userData);
        await User.findOneAndUpdate({_id:user},{$set:{is_verified:true}},{upsert:true})
        let token = await Tokenmodel.findOne({ userId: user });
        console.log(token);
        if (!token) {
            token = await new Tokenmodel({
                userId: user,
                token: jwt.sign({ userId: user }, process.env.JwtSecretKey, { expiresIn: 60000 })
            });
            await token.save();
        }
        return res.status(200).json({ user: userData, token: token, alert: 'Verified Logined', status: true });
    } catch (error) {
        console.log(error);
    }
}

const forgotPassword=async(req,res)=>{
    try {
        const { email } = req.body;
        console.log(email);
        const exists = await User.findOne({ email: email });
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
        const user = await User.findOne({ email: email });
        console.log(user);
        const token = await Tokenmodel.findOne({ userId: user._id });
        console.log(token);
        if(otp===token.token){
            const hash = await bcrypt.hash(password,10)
            user.password = hash;
            await user.save();
            console.log();
            await Tokenmodel.findOneAndDelete({ userId: user._id });
            res.status(200).json({message:"Success",status:true});
        }else{
            await Tokenmodel.findOneAndDelete({ userId: user._id });
            res.status(200).json({message:"Failed",status:false});
        }
    } catch (error) {
        console.log(error.message);
    }
}

const homeData=async(req,res)=>{
    try {
        const homeData=await Manager.find({is_authorized:true, eventData: { $exists: true, $ne: null }})
        console.log(homeData);
        return res.status(200).json({homeData})
    } catch (error) {
        
    }
}

const detailData=async(req,res)=>{
    try {
        const id = req.query.id
        console.log(id);
        const detailData=await Manager.findById(id)
        console.log(detailData);
        const result=detailData.eventData
        return res.status(200).json({result})
    } catch (error) {
        console.log(error.message);
    }
}

const eventList=async(req,res)=>{
    try {
        const name=req.query.name
        const managers = await Manager.find({
            [`eventData.events.${name}`]: 'true'
          },{ 'eventData': 1, '_id': 0 });
          return res.status(200).json({managers})
    } catch (error) {
        console.log(error.message);
    }
}

const managerData=async(req,res)=>{
    try {
        const id=req.params.id
        const manager=await Manager.findById(id)
        console.log(manager);
        return res.status(200).json({data:manager, status:true})

    } catch (error) {
        console.log(error.message);
    }
}

const submitBooking=async(req,res)=>{
    try {
        console.log(req.body);
        const data=req.body.eventdata
        const booking= new Booking({
            manager_id: data.manager_id,
            user_id: data.user_id,
            name: data.name,
            event_name: data.event_name,
            mob: data.mob,
            event: data.event,
            preffered_dishes: data.preffered_dishes,
            address :data.address,
            date: data.date,
            time: data.time,
            additional_data: data.additional_data
        })
        await booking.save()
        console.log(req.body);
        return res.status(200).json({alert:'Booking saved',status:true})
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    userReg,
    userLogin,
    userGoogleLogin,
    VerifyEmail,
    forgotPassword,
    VerifyPassword,
    homeData,
    detailData,
    eventList,
    managerData,
    submitBooking
}
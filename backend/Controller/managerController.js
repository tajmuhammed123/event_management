const Manager=require('../Models/managerModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const  Tokenmodel =require('../Models/token.js')

const managerReg = async (req,res)=>{
    try{
        console.log('heyyy');
        const {value,eventdata} = req.body
        console.log(value,eventdata);
        const {name,email,password,mob}=value
        const {team_name,salutation,about,events,location,dishes}=eventdata
        const exists=await Manager.findOne({email:email})
        if(exists){
            return res.status(400).json({status: false,message:'Email already in used'});
        }
        const hash = await bcrypt.hash(password,10)
        const newUser =  new Manager({
          name,
          email,
          mob,
          password:hash
       })

       const newEvent={
        team_name,
        salutation,
        about,
        events,
        location,
        dishes
        }
        newUser.eventData=newEvent
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

const eventData=async(req,res)=>{
    try {
        console.log('entered');
        const {userID}=req.params
        const exists=await Manager.findById(userID)
        if(exists){
            const {name,salutation,about,events,location,dishes}=req.body
            const newEvent={
                team_name:name,
                salutation,
                about,
                events,
                location,
                dishes

            }
            console.log(newEvent);
            exists.eventData=newEvent
            await exists.save()
        }
        return res.status(200).json({ alert:'Data added', status: true});
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    managerReg,
    eventData,
    managerLogin,
    forgotPassword,
    VerifyPassword
}
const User=require('../Models/userModels')
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
            res.status(400).json({status: false,message:'Email already in used'});
        }
        const hash = await bcrypt.hash(password,10)
        const newUser =  new User({
          name,
          email,
          mob,
          password:hash,
          is_manager:false
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
                
                return res.status(200).json({ user: exists, token: token, alert: 'Login', status: true });
            } else {
                return res.status(404).json({ alert: "Password is wrong", status: false });
            }
        }
    } catch (error) {
        console.log(error.message);
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

module.exports={
    userReg,
    userLogin,
    forgotPassword,
    VerifyPassword
}
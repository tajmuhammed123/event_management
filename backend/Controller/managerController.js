const User=require('../Models/userModels')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const  Tokenmodel =require('../Models/token.js')

const managerReg = async (req,res)=>{
    try{
        console.log('heyyy');
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
          password:hash,
          is_manager:true
       })
    
        let user =  await newUser.save().then(console.log("Registered"))
        const token=await new Tokenmodel ({
            userId:user._id,
            token:jwt.sign({ userId: user._id }, process.env.JwtSecretKey, { expiresIn: 60000 })
          });
          await token.save()
        return res.status(200).json({ token: token,user:newUser, alert:'Registred', status: true, is_manager:true});
    }catch(error){
        console.log(error.message);
    }
}

module.exports={
    managerReg
}
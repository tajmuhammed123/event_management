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
    eventData
}
const User=require('../Models/userModels')
const Manager=require('../Models/managerModel')
const Events=require('../Models/eventsModel')
const Booking=require('../Models/bookingData')
const Payment=require('../Models/transactionModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require('dotenv').config()
const  Tokenmodel =require('../Models/token.js')

const {sendEmail} =require('../utils/email')
const { default: Stripe } = require('stripe')
const { useParams } = require('react-router-dom')

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
        
        const exists = await User.findOne({ email: email, is_block:false });
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
                            token: jwt.sign({ userId: exists._id }, process.env.JwtSecretKey, { expiresIn: '1d' })
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
              token: jwt.sign({ userId: exists._id }, process.env.JwtSecretKey, { expiresIn: '1d' }),
            });
          } else {
            token.token = jwt.sign({ userId: exists._id }, process.env.JwtSecretKey, { expiresIn: '1d' });
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

const getEventData=async(req,res)=>{
    try {
        const eventData=await Events.find({is_block:false})
        console.log(eventData);
        return res.status(200).json({eventData})
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
        console.log(booking);
        const bookingdata=await booking.save()
        console.log(req.body);
        return res.status(200).json({alert:'Booking saved',status:true,data:bookingdata})
    } catch (error) {
        console.log(error.message);
    }
}

// const userPayment = async (req, res) => {
//     try {
//       const stripe = require("stripe")(
//         "sk_test_51NwHkGSEDFbx4uMAi4gaS8gIKK34IfRc6c1ang04n7KDxk5t8rRyid4fKedWCBqlaBUJeKDMczwzhCtPU1nWriaq00ahzBlJ8c"
//       );
//         console.log('hgff');
//       const session = await stripe.checkout.sessions.create({
//         payment_method_types: ["card"],
//         mode: "payment",
//         line_items: [
//           {
//             price_data: {
//               currency: "inr",
//               product_data: {
//                 name: "Product Name"
//               },
//               unit_amount: 100,
//             },
//             quantity: 1,
//           },
//         ],
//         success_url: "http://localhost:3000/success",
//         cancel_url: "http://localhost:3000/cancel",
//       });
//       console.log('jhkg');
//       res.json({ url: session.url });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

const userPayment=async(req,res)=>{
    try {
        console.log('hj');
        const {id}=req.params
        console.log(id);
        const managerdata=await Manager.findById(id)
        const manager=await Manager.findOne({_id:id})
        console.log(manager);
        const stripe=new Stripe('sk_test_51NwHkGSEDFbx4uMAi4gaS8gIKK34IfRc6c1ang04n7KDxk5t8rRyid4fKedWCBqlaBUJeKDMczwzhCtPU1nWriaq00ahzBlJ8c')
        let price=manager.eventData.advance_amount
        console.log(manager.eventData.advance_amount);
        console.log(manager.eventData);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price*100,
            currency: "inr",
            automatic_payment_methods: {
              enabled: true,
            },
          });
          console.log(paymentIntent);
          res.status(200).json({
            clientSecret: paymentIntent.client_secret})
    } catch (error) {
        console.log(error.message);
    }
}

const paymentSuccess=async(req,res)=>{
    try {
        console.log('fgfg');
        const {id,mangId}=req.params
        const bookingdata=await Booking.findByIdAndUpdate(id,{$set:{is_paid:'paid'}},{new:true,upsert:true})
        const managerdata=await Manager.findById(mangId)
        const price=managerdata.eventData.advance_amount
        console.log(price);
        const data=await Manager.findOne({_id:mangId})
        console.log(data);
        const updatedDocument = await User.findOneAndUpdate(
            { is_admin: true },
            { $inc: { wallet_amount: price } },
            { new: true, upsert: true }
          );
          const paymentdata= new Payment({
            userId:bookingdata.user_id,
            managerId:mangId,
            bookingId:id,
            amount:price,
            status:'paid'
          })
          await paymentdata.save()
          console.log("Updated document:", updatedDocument);
        res.status(200).json({status:true})

    } catch (error) {
        console.log(error.message);
    }
}

const orderHistory=async(req,res)=>{
    try {
        const {id}=req.params
        console.log(id);
        const data=await Booking.find({user_id:id})
        console.log(data);
        res.status(200).json({data:data})
    } catch (error) {
        console.log(error.message);
    }
}

const cancelOrder=async(req,res)=>{
    try {
        const {id}=req.params
        console.log(id);
        const payData = await Payment.findOne({bookingId:id})
        const data=await Booking.findById(id)
        await Booking.findByIdAndUpdate(id,{$set:{is_paid:'cancelled'}})
        console.log(data);
        console.log(payData);
        const price=payData.amount
        let ans= await User.findByIdAndUpdate(data.user_id,{$inc:{wallet_amount:price}})
        let admin=await User.findOneAndUpdate({is_admin:true},{$inc:{wallet_amount:-price}})
        console.log(ans);
        console.log(admin);
        const paymentdata = new Payment({
            userId: data.user_id, 
            managerId: data.manager_id, 
            bookingId: id,
            amount: price,
            status: 'cancelled'
          });
          await paymentdata.save()
        console.log(data);
        res.status(200).json({status:true})
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
    getEventData,
    detailData,
    eventList,
    managerData,
    submitBooking,
    userPayment,
    paymentSuccess,
    orderHistory,
    cancelOrder
}
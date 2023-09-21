const express=require('express')
const managerRouter=express.Router()
const managerController=require('../Controller/managerController')
const {upload} = require("../utils/Multer");

managerRouter.post('/',managerController.managerLogin)
managerRouter.post("/signup",managerController.managerReg)
managerRouter.patch('/forgotpas',managerController.forgotPassword)
managerRouter.patch('/verifypassword',managerController.VerifyPassword)
managerRouter.post('/eventdata/:userID',upload.any("profileImage"),managerController.eventData)
managerRouter.get('/managerdata',managerController.managerData)
managerRouter.get('/managerverify',managerController.managerVerify)
managerRouter.get('/bookingdata/:id',managerController.bookingData)

module.exports=managerRouter
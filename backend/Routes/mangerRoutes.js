const express=require('express')
const managerRouter=express.Router()
const managerController=require('../Controller/managerController')
const {upload} = require("../utils/Multer");
const { managerAuth } = require('../Middleware/managerMiddleware');

managerRouter.post('/',managerController.managerLogin)
managerRouter.post("/signup",managerController.managerReg)
managerRouter.patch('/forgotpas',managerController.forgotPassword)
managerRouter.patch('/verifypassword',managerController.VerifyPassword)
managerRouter.post('/eventdata/:userID',managerAuth,upload.any("profileImage"),managerController.eventData)
managerRouter.get('/managerdata',managerAuth,managerController.managerData)
managerRouter.get('/managerverify',managerController.managerVerify)
managerRouter.get('/bookingdata/:id',managerAuth,managerController.bookingData)

module.exports=managerRouter
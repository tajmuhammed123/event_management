const express=require('express')
const managerRouter=express.Router()
const managerController=require('../Controller/managerController')
const messageController=require('../Controller/messageController')
const {upload} = require("../utils/Multer");
const { managerAuth } = require('../Middleware/managerMiddleware');

managerRouter.post('/',managerController.managerLogin)
managerRouter.post("/signup",managerController.managerReg)
managerRouter.patch('/forgotpas',managerController.forgotPassword)
managerRouter.patch('/verifypassword',managerController.VerifyPassword)
managerRouter.post('/eventdata/:userID',managerAuth,upload.any("images"),managerController.eventData)
managerRouter.get('/managerdata',managerAuth,managerController.managerData)
managerRouter.get('/managerverify',managerController.managerVerify)
managerRouter.get('/geteventdata',managerController.getEventData)
managerRouter.get('/bookingdata/:id',managerAuth,managerController.bookingData)
managerRouter.get('/usersearch',managerController.searchUsers)
managerRouter.get('/fetchchat/:userId',managerController.fetchChats)
managerRouter.post('/message',messageController.managerMessage)

module.exports=managerRouter
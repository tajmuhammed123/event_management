const express=require('express')
const userRouter=express.Router()
const userController=require('../Controller/userController')
const messageController=require('../Controller/messageController')
const { userAuth } = require('../Middleware/authMiddleware')

userRouter.post('/signup',userController.userReg)
userRouter.post('/login',userController.userLogin)
userRouter.post('/googlelogin',userController.userGoogleLogin)
userRouter.get('/verifyemail',userController.VerifyEmail)
userRouter.patch('/forgotpas',userController.forgotPassword)
userRouter.patch('/verifypassword',userController.VerifyPassword)
userRouter.get('/homedata',userController.homeData)
userRouter.get('/geteventdata',userController.getEventData)
userRouter.get('/detailpage',userController.detailData)
userRouter.get('/eventlist',userController.eventList)
userRouter.get('/managerdata/:id',userController.managerData)
userRouter.get('/orderdata/:id',userAuth,userController.orderHistory)
userRouter.get('/cancelorder/:id',userAuth,userController.cancelOrder)
userRouter.post('/eventbooking',userAuth,userController.submitBooking)
userRouter.post('/payment/:id',userController.userPayment)
userRouter.post('/paymentsuccess/:id/:mangId',userController.paymentSuccess)
userRouter.post('/accesschat',userController.accessChat)
userRouter.get('/fetchchat/:userId',userController.fetchChats)
userRouter.get('/usersearch',userController.searchUsers)
userRouter.post('/message',messageController.sendMessage)
userRouter.get('/message/:chatId',messageController.allMessages)

module.exports=userRouter
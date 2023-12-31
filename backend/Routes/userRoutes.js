const express=require('express')
const userRouter=express.Router()
const userController=require('../Controller/userController')
const messageController=require('../Controller/messageController')
const { userAuth } = require('../Middleware/authMiddleware')
const { upload } = require('../Middleware/Multer')

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
userRouter.get('/paymentbookingdata/:id',userController.paymentBookingData)
userRouter.get('/bookingpaymentsuccess/:id',userController.paymentBookingSuccess)
userRouter.post('/payment/',userController.userPayment)
userRouter.post('/paymentsuccess/:id',userController.paymentSuccess)
userRouter.post('/accesschat',userController.accessChat)
userRouter.get('/fetchchat/:userId',userController.fetchChats)
userRouter.get('/usersearch',userController.searchUsers)
userRouter.post('/message',messageController.sendMessage)
userRouter.get('/message/:chatId',messageController.allMessages)
userRouter.post('/submitreview',userAuth,userController.submitReview)
userRouter.post('/submitreport',userAuth,userController.submitReport)
userRouter.get('/bannerdata',userController.bannerData)
userRouter.post('/updateuserprofile',userAuth,upload.single('profile_img'),userController.updateUser)

module.exports=userRouter
const express=require('express')
const userRouter=express.Router()
const userController=require('../Controller/userController')
const { userAuth } = require('../Middleware/authMiddleware')

userRouter.post('/signup',userController.userReg)
userRouter.post('/login',userController.userLogin)
userRouter.post('/googlelogin',userController.userGoogleLogin)
userRouter.get('/verifyemail',userController.VerifyEmail)
userRouter.patch('/forgotpas',userController.forgotPassword)
userRouter.patch('/verifypassword',userController.VerifyPassword)
userRouter.get('/homedata',userController.homeData)
userRouter.get('/detailpage',userController.detailData)
userRouter.get('/eventlist',userController.eventList)
userRouter.get('/managerdata/:id',userController.managerData)
userRouter.post('/eventbooking',userAuth,userController.submitBooking)

module.exports=userRouter
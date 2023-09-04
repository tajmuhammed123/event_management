const express=require('express')
const userRouter=express.Router()
const userController=require('../Controller/userController')

userRouter.post('/signup',userController.userReg)
userRouter.post('/login',userController.userLogin)
userRouter.post('/googlelogin',userController.userGoogleLogin)
userRouter.patch('/forgotpas',userController.forgotPassword)
userRouter.patch('/verifypassword',userController.VerifyPassword)

module.exports=userRouter
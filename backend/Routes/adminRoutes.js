const express=require('express')
const adminRouter=express.Router()
const adminController=require('../Controller/adminController')

adminRouter.post('/login',adminController.adminLogin)

module.exports=adminRouter
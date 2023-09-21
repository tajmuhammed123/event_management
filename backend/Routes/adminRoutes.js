const express=require('express')
const adminRouter=express.Router()
const adminController=require('../Controller/adminController')

adminRouter.post('/login',adminController.adminLogin)
adminRouter.get('/getmanagerdata',adminController.managerData)
adminRouter.post('/managerapproval',adminController.managerApprove)
adminRouter.post('/managerreject',adminController.managerReject)

module.exports=adminRouter
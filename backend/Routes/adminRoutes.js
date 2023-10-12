const express=require('express')
const adminRouter=express.Router()
const adminController=require('../Controller/adminController')
const { upload } = require('../Middleware/Multer')
const { adminAuth } = require('../Middleware/adminMiddleware')

adminRouter.post('/login',adminController.adminLogin)
adminRouter.get('/getmanagerdata',adminAuth,adminController.managerData)
adminRouter.get('/getuserdata',adminAuth,adminController.userData)
adminRouter.get('/getbookingdata',adminAuth,adminController.bookingData)
adminRouter.get('/blockuser/:id',adminAuth,adminController.userBlock)
adminRouter.get('/reportdata',adminAuth,adminController.reportData)
adminRouter.get('/reportdetails/:id',adminAuth,adminController.reportDetail)
adminRouter.post('/managerapproval',adminAuth,adminController.managerApprove)
adminRouter.post('/managerreject',adminAuth,adminController.managerReject)
adminRouter.post('/addeventcategorey',upload.single('eventlogo'),adminController.addEvent)

module.exports=adminRouter
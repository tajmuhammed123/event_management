const express=require('express')
const managerRouter=express.Router()
const managerController=require('../Controller/managerController')

managerRouter.post('/',managerController.managerLogin)
managerRouter.post('/signup',managerController.managerReg)
managerRouter.patch('/forgotpas',managerController.forgotPassword)
managerRouter.patch('/verifypassword',managerController.VerifyPassword)
managerRouter.post('/eventdata/:userID',managerController.eventData)

module.exports=managerRouter
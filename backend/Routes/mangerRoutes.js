const express=require('express')
const managerRouter=express.Router()
const managerController=require('../Controller/managerController')

managerRouter.post('/signup',managerController.managerReg)
managerRouter.post('/eventdata/:userID',managerController.eventData)

module.exports=managerRouter
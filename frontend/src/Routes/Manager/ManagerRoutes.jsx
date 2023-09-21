import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../../Components/Manager/Home/Home'
import ManagerSignUp from '../../Components/Manager/SignUp/ManagerSignUp'
import EventData from '../../Components/Manager/SignUp/EventData'
import LogIn from '../../Components/Manager/Login/Login'
import EmailVerified from '../../Components/Manager/Common/EmailVerified'
import ManagerPublic from './ManagerPublic'

function ManagerRoutes() {
  return (
    <Routes>
        <Route path="/" element={<ManagerPublic><LogIn/></ManagerPublic>}></Route>
        <Route path="/signup" element={<ManagerSignUp/>}></Route>
        <Route path="/eventdata" element={<EventData/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path='/managerverify/:id' element={<EmailVerified/>}></Route>
    </Routes>
  )
}

export default ManagerRoutes
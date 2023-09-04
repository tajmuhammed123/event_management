import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from '../Components/Manager/Home/Home'
import ManagerSignUp from '../Components/Manager/SignUp/SignUp'

function ManagerRoutes() {
  return (
    <Routes>
        <Route path="/signup" element={<ManagerSignUp/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
    </Routes>
  )
}

export default ManagerRoutes
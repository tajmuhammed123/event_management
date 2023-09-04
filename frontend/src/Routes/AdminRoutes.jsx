import React from 'react'
import {Routes, Route} from 'react-router-dom'
import AdminLogIn from '../Components/Admin/AdminLogin/AdminLogin'
import AdminPublic from './AdminPublic'
import AdminHome from '../Components/Admin/Home/AdminHome'

function AdminRoutes() {
  return (
    <Routes>
        <Route path="/" element={<AdminPublic><AdminLogIn /></AdminPublic>}></Route>
        <Route path="/dashboard" element={<AdminHome/>}></Route>
    </Routes>
  )
}

export default AdminRoutes
import {Routes, Route} from 'react-router-dom'
import SignUp from '../Components/SignUp/SignUp'
import LogIn from '../Components/Login/Login'
import Home from '../Components/Home/Home'

function UserRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
    </Routes>
  )
}

export default UserRouter
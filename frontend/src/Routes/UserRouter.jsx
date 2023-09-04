import {Routes, Route} from 'react-router-dom'
import SignUp from '../Components/User/SignUp/SignUp'
import LogIn from '../Components/User/Login/Login'
import Home from '../Components/User/Home/Home'
import About from '../Components/User/AboutPage/About'
import Events from '../Components/User/Events/Events'
import UserPublic from './UserPublic'

function UserRouter() {
  return (
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/eventdata" element={<About />}></Route>
        <Route path="/eventlist" element={<Events />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<UserPublic> <LogIn /></ UserPublic>}></Route>
    </Routes>
  )
}

export default UserRouter